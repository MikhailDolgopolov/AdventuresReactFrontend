import React, {useEffect, useState} from 'react';
import ButtonSelect from "../../../Fragments/ButtonSelect";
import {City, Sight, SightVisitCombined, Trip, TripPoint} from "../../../../Helpers/DataTypes";
import SearchInput from "../../../Fragments/SearchInput";
import moment from "moment/moment";
import Modal from "../../../Fragments/Modal";
import {post} from "../../../../Server/Requests";
import {useForm} from "react-hook-form";
import useFetch from "../../../../Hooks/useFetch";

function AddSightModal({addSightRef, closeSwitch, points, trip_id, onChange}:
      {addSightRef:React.MutableRefObject<any>, closeSwitch:boolean, points:TripPoint[], trip_id:number,  onChange:()=>void}) {
    const [trip] = useFetch<Trip>("trips/get/"+trip_id);
    const [sights] = useFetch<Sight[]>("sights/", closeSwitch)
    const [cities] = useFetch<City[]>("cities/")
    const [selectedPoint, setPoint] = useState<TripPoint>()
    const [selectedCity, setCity] = useState<string>()
    const [selectedSight, setSight] = useState<Sight>()
    const [sightName, setSightName] = useState<string>("")
    const [selectedDate, setDate] = useState<string>("")
    const {register, handleSubmit} = useForm<SightVisitCombined>()

    useEffect(()=>{
        if(points.length>0) {
            setPoint(points[0])
            setCity(points[0].city)
        }
    },[])
    useEffect(()=>{
        if(trip) setDate(trip.start_date)
    }, [trip])
    if(!sights || !cities) return <></>
    const submit = handleSubmit((newVisit)=>{
        if(!selectedPoint) return
        newVisit.name=sightName;

        newVisit.trippoint_id=selectedPoint.trippoint_id;
        if(selectedCity) newVisit.city=selectedCity;
        if(selectedSight){
            newVisit.sight_id=selectedSight.sight_id;
            newVisit.type=selectedSight.type;
            newVisit.created_year=selectedSight.created_year;
            newVisit.city=selectedSight.city;
        }
        newVisit.visited_date=selectedDate
        console.log(newVisit)
        post("sights/visit/", JSON.stringify(newVisit)).then(()=> {close();onChange();});
    } )
    return (
        <Modal header={"Посещённое место"} openRef={addSightRef} offToggle={closeSwitch}>
            <form className="vert-window" onSubmit={submit}>
                <p>Относится к остановке:</p>
                <ButtonSelect<TripPoint> array={points} id={"trippoints"} stringify=
                    {(p) => p.title} onSelect={(p) => setPoint(p)}/>
                <div className="form-row">
                    <label>Название</label>
                    <SearchInput<Sight> id={"sightName"} array={sights} onSetValue={(s)=>setSightName(s)}
                                        stringify={(s)=>s.name} onSetItem={(s)=>{setSight(s);
                        if(s) setCity(s.city)}}/>
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
                    <SearchInput id={"sightCity"} array={cities} stringify={(c)=>c.city}
                                 onSetValue={(s)=>setCity(s)} onlySelect={true}/>
                </div>}
                <button type="submit">Добавить</button>
            </form>
        </Modal>
    );
}

export default AddSightModal;