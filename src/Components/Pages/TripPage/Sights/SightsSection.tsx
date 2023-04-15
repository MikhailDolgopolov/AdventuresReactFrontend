import React, {useEffect, useRef, useState} from 'react';
import {City, Sight, SightVisit, SightVisitCombined, Trip, TripPoint} from "../../../../Helpers/DataTypes";
import useFetch from "../../../../Hooks/useFetch";
import LoadingError from "../../LoadingError";
import SightList from "./SightList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../Fragments/Modal";
import ButtonSelect from "../../../Fragments/ButtonSelect";
import {useForm} from "react-hook-form";
import SearchInput from "../../../Fragments/SearchInput";
import {MyData} from "../../../../Helpers/HelperTypes";
import moment from 'moment'
import {post} from "../../../../Server/Requests";
import useSwitch from "../../../../Hooks/useSwitch";


function SightsSection({trip, data, points}:{trip:Trip, data:MyData, points:TripPoint[]}) {

    const [selectedPoint, setPoint] = useState<TripPoint>()
    const [selectedCity, setCity] = useState<string>()
    const [selectedSight, setSight] = useState<Sight>()
    const [sightName, setSightName] = useState<string>("")
    const [selectedDate, setDate] = useState<string>(trip.start_date)
    const {register, handleSubmit} = useForm<SightVisitCombined>()
    const [closeAdder, close] = useSwitch()
    const [sights, loadingSights] = useFetch<SightVisitCombined[]>("sights/for_trip/"+trip.trip_id, closeAdder)

    const addSightRef = useRef(null)
    useEffect(()=>{
        if(points.length>0) {
            setPoint(points[0])
            setCity(points[0].city)
        }
    },[])
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
        post("sights/visit/", JSON.stringify(newVisit)).then(()=> {close();data.refetchFunction();});
    } )
    if(!sights) return <LoadingError loadingObject={"достопримечательности"} loading={loadingSights}/>
    return (
        <section>
            <h2>Достопримечательности</h2>
            <Modal header={"Посещённое место"} openRef={addSightRef} offToggle={closeAdder}>
                <form className="vert-window" onSubmit={submit}>
                    <p>Относится к остановке:</p>
                    <ButtonSelect<TripPoint> array={points} id={"trippoints"} stringify=
                        {(p) => p.title} onSelect={(p) => setPoint(p)}/>
                    <div className="form-row">
                        <label>Название</label>
                        <SearchInput<Sight> id={"sightName"} array={data.sights} onSetValue={(s)=>setSightName(s)}
                                            stringify={(s)=>s.name} onSetItem={(s)=>{setSight(s);
                                                if(s) setCity(s.city)}}/>
                    </div>
                    <div className="form-row">
                        <label>Дата: </label>
                        <input type="date"  autoComplete="off" {...register("visited_date")} onChange={(event)=>{
                            setDate(event.target.value)
                        }}
                               defaultValue={moment(trip.start_date).format("yyyy-MM-DD")}/>
                    </div>
                    {!selectedSight&&<div className="form-row">
                        <label>Город</label>
                        <SearchInput id={"sightCity"} array={data.cities} stringify={(c)=>c.city}
                                     onSetValue={(s)=>setCity(s)} onlySelect={true}/>
                    </div>}
                    <button type="submit">Добавить</button>
                </form>
            </Modal>
            <SightList sights={sights} onChange={close} trippoints={points}/>
            <div className="row edges">
                <button className="big" ref={addSightRef}>
                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                </button>
            </div>
        </section>
    );
}

export default SightsSection;