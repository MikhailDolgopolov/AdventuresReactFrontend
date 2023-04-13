import React, {useRef, useState} from 'react';
import {City, Sight, SightVisit, Trip, TripPoint} from "../../../../Helpers/DataTypes";
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
//
// let moment = require('moment');

function SightsSection({trip, data, points}:{trip:Trip, data:MyData, points:TripPoint[]}) {

    const [selectedPoint, setPoint] = useState<TripPoint>(points[0])
    const [selectedCity, setCity] = useState<string>(selectedPoint.city)
    const [selectedSight, setSight] = useState<string>()
    const [selectedDate, setDate] = useState<Date>(new Date(trip.start_date))
    const {register, handleSubmit} = useForm<Sight>()
    const [sights, loadingSights] = useFetch<Sight[]>("sights/for_trip/"+trip.trip_id, selectedSight==undefined)
    const addSightRef = useRef(null)
    const submit = handleSubmit((newSight)=>{
        if(!selectedPoint) return
        newSight.name=selectedSight!;
        newSight.city=selectedCity;
        let visit:SightVisit =
            {sight_id:-1, trippoint_id:selectedPoint.trippoint_id,
            date: moment(selectedDate, 'DD-MM-yyyy', true).format("DD-MM-yyyy")}
        post("sights/create/", JSON.stringify(newSight)).then((res:string)=> {
                visit.sight_id=parseInt(res)
                post("sights/visit/", JSON.stringify(visit));
                setSight(undefined)
            }
        )
    } )
    if(!sights) return <LoadingError loadingObject={"достопримечательности"} loading={loadingSights}/>
    return (
        <section>
            <h2>Достопримечательности</h2>
            <Modal header={"Посещённое место"} openRef={addSightRef} offToggle={selectedSight==undefined}>
                <form className="vert-window" onSubmit={submit}>
                    <p>Относится к остановке:</p>
                    <ButtonSelect<TripPoint> array={points} id={"trippoints"} stringify=
                        {(p) => p.title} onSelect={(p) => setPoint(p)}/>
                    <div className="form-row">
                        <label>Название</label>
                        <SearchInput<Sight> id={"sightName"} array={data.sights}
                                            stringify={(s)=>s.name} onSetValue={(s)=>setSight(s)}/>
                    </div>
                    <div className="form-row">
                        <label>Дата: </label>
                        <input type="date" onChange={(event)=>{
                            setDate(new Date(event.target.value))
                        }}
                               defaultValue={moment(trip.start_date).format("yyyy-MM-DD")}/>
                    </div>
                    <div className="form-row">
                        <label>Город</label>
                        <SearchInput id={"sightCity"} array={data.cities} stringify={(c)=>c.city}
                                     onSetValue={(s)=>setCity(s)} onlySelect={true} defaultValue={points[0].city}/>
                    </div>
                    <button type="submit">Добавить</button>
                </form>
            </Modal>
            <SightList sights={sights}/>
            <div className="row edges">
                <button className="big" ref={addSightRef}>
                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                </button>
            </div>
        </section>
    );
}

export default SightsSection;