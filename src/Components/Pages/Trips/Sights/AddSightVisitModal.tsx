import React, {useEffect, useState} from 'react';
import ButtonSelect from "../../../Fragments/ButtonSelect";
import {City, Country, Sight, SightVisitCombined, Trip, TripPoint} from "../../../../Helpers/DataTypes";
import SearchInput from "../../../Fragments/SearchInput";
import moment from "moment/moment";
import Modal from "../../../Fragments/Modal";
import {post} from "../../../../Server/Requests";
import {useForm} from "react-hook-form";
import useFetch from "../../../../Hooks/useFetch";
import axios from "axios";
import {serverProperties} from "../../../../Server/ServerProperties";
import useSwitch from "../../../../Hooks/useSwitch";
import useLogger from "../../../../Hooks/useLogger";
import ButtonSelectWithInput from "../../../Fragments/ButtonSelectWithInput";

function AddSightVisitModal({addSightRef, closeSwitch, points, trip_id, onChange}:
      {addSightRef:React.MutableRefObject<any>, closeSwitch?:boolean, points:TripPoint[], trip_id:number,  onChange:()=>void}) {
    const [trip] = useFetch<Trip>("trips/"+trip_id);
    const [sights] = useFetch<Sight[]>("sights/", closeSwitch)
    const [cities] = useFetch<City[]>("cities/")
    const [selectedPoint, setPoint] = useState<TripPoint>(points[0])
    const [selectedCity, setCity] = useState<string>(points[0].city)
    const [sightTypes] = useFetch<string[]>("sights/types/", closeSwitch)
    const [selectedType, setType] = useState<string>("")
    const [selectedSight, setSight] = useState<Sight>()
    const [sightName, setSightName] = useState<string>("")
    const [selectedDate, setDate] = useState<string>("")
    const [refetchCountry, flipRefetchCountry] = useSwitch()
    const [currentCountry] = useFetch<Country>("countries/for_city/"+selectedPoint.city, refetchCountry)
    const {register, handleSubmit, reset} = useForm<SightVisitCombined>()

    useEffect(()=>{
        if(trip) setDate(trip.start_date)
    }, [trip])

    if(!sights || !cities) return <></>
    const submit = handleSubmit((newVisit)=>{
        newVisit.name=sightName;
        newVisit.trippoint_id=selectedPoint.trippoint_id;
        newVisit.type=selectedType;
        if(selectedCity) newVisit.city=selectedCity;
        if(selectedSight){
            newVisit.sight_id=selectedSight.sight_id;
            newVisit.type=selectedSight.type;
            newVisit.created_year=selectedSight.created_year;
            newVisit.city=selectedSight.city;
        }
        newVisit.visited_date=selectedDate
        const citySeek = cities.find(c=>c.city==selectedCity)
        if(!citySeek && selectedCity){
            if(!currentCountry) {alert("Подождите немного... Нужно немного времени."); return;}
            const newCity:City = {city:selectedCity, country:currentCountry.country, founded_year:0, population:0}
            if(confirm(currentCountry.country+": будет добавлен город "+selectedCity.toString()+"."))
                post("cities/create/", JSON.stringify(newCity)).then(()=>
                    post("sights/visit/", JSON.stringify(newVisit)).then(()=> {onChange();}))
        }else
            post("sights/visit/", JSON.stringify(newVisit)).then(()=> {onChange();});
    } )
    return (
        <Modal header={"Посещённое место"} openRef={addSightRef} offToggle={closeSwitch} positioning="absolute"
        onClose={()=>reset({name:"", description:""})}>
            <form className="vert-window" onSubmit={submit}>
                <p>Относится к остановке:</p>
                <ButtonSelect<TripPoint> array={points} id={"trippoints"} stringify=
                    {(p) => p.title} onSelect={(p) => {
                        setPoint(p);
                        flipRefetchCountry();
                    }}/>
                <div className="form-row">
                    <label>Название</label>
                    <SearchInput<Sight> id={"sightName"} array={sights} onSetValue={(s)=>setSightName(s)}
                                        stringify={(s)=>s.name} onSetItem={(s)=>{setSight(s);
                        if(s) setCity(s.city)}}/>
                </div>
                <div>
                    <label>Тип: </label>
                    <ButtonSelectWithInput<string> array={sightTypes} id={"sightTypes"} stringify={(t)=>t}
                                                   onSelect={(s)=>setType(s)}/>
                </div>
                <div className="form-row">
                    <label>Дата: </label>
                    {trip&&<input type="date"  autoComplete="off" {...register("visited_date")} onChange={(event)=>{
                        setDate(event.target.value)
                    }}
                           defaultValue={moment(trip.start_date).format("yyyy-MM-DD")}/>}
                </div>
                {!selectedSight&&<div className="form-row">
                    <label>Город</label>
                    <SearchInput id={"sightCity"} array={cities} stringify={(c)=>c.city} not_required={true}
                                 onSetValue={(s)=>setCity(s)} defaultValue={selectedPoint&&selectedPoint.city}/>
                </div>}
                <button type="submit">Добавить</button>
            </form>
        </Modal>
    );
}

export default AddSightVisitModal;