import React, {useEffect, useRef, useState} from 'react';
import {City, Sight, SightVisitCombined, TripPoint} from "../../../../Helpers/DataTypes";
import Modal from "../../../Fragments/Modal";
import {post} from "../../../../Server/Requests";
import useSwitch from "../../../../Hooks/useSwitch";
import useFetch from "../../../../Hooks/useFetch";
import {useForm} from "react-hook-form";
import SearchInput from "../../../Fragments/SearchInput";
import moment from 'moment'
import ButtonSelect from "../../../Fragments/ButtonSelect";
import ButtonSelectWithInput from "../../../Fragments/ButtonSelectWithInput";
import Line from "../../../Fragments/Line";

function SightBlock({s, onChange, trippoints}:{s:SightVisitCombined, onChange:()=>any, trippoints:TripPoint[]}) {
    const editSightRef = useRef(null)
    const [closeModal, flip] = useSwitch()
    const [cities] = useFetch<City[]>("cities/")
    const [types] = useFetch<string[]>("sights/types/", closeModal);
    const [selectedCity, setCity] = useState<string>(s.city)
    const [selectedDate, setDate] = useState<string>("")
    const [selectedType, setType] = useState<string>(s.type)
    const [selectedPoint, setPoint] = useState<TripPoint>()
    const {register, handleSubmit} = useForm<SightVisitCombined>()


    const onSubmit=handleSubmit((newVisit:SightVisitCombined, e?)=>{
        e!.preventDefault()
        newVisit.city=selectedCity;
        newVisit.visited_date=selectedDate
        newVisit.type=selectedType;
        post("sights/update_visit/", JSON.stringify(newVisit)).then(()=>{flip();onChange();})
        })
    useEffect(()=>{
        setDate(s.visited_date);
    },[])
    function deleteSight() {
        if(confirm("Вы собираетесь удалить все данные, связанные с "+s.name+". Продолжить?"))
            post("sights/delete/", JSON.stringify(s)).then(()=>{
                flip()
                onChange()
            })
    }
    function deleteVisit() {
        if(confirm(s.name+" исчезнет из списка посещенных мест. Продолжить?"))
            post("sights/delete_visit/"+s.sight_id, JSON.stringify(s.trippoint_id)).then(()=>{
                flip()
                onChange()
            })
    }
    return (
        <>
            <button className="flex-block highlight" key={s.sight_id} ref={editSightRef}>
                <h3>{s.name}</h3>
                {(s.visited_date) && <p>{s.visited_date}</p>}
                <p>{s.type}</p>
            </button>
            <Modal header="Изменить данные" openRef={editSightRef} offToggle={closeModal}>
                <form className="vert-window" onSubmit={onSubmit}>
                    <div className="form-row">
                        <label>Название: </label>
                        <input defaultValue={s.name} {...register("name")}/>
                    </div>
                    <div className="form-row">
                        <label>Город: </label>
                        <SearchInput id={"sightCities"} array={cities} stringify={(c)=>c.city} defaultValue={s.city}
                                     onSetValue={(s)=>setCity(s)} onlySelect={true} not_required={true}/>
                    </div>
                    <Line/>
                    Тип:
                    <ButtonSelectWithInput<string> array={types} id={"sightTypes"} stringify={(t)=>t}
                                           onSelect={(s)=>setType(s)} defaultValue={s.type}/>
                    <div className="form-row">
                        <label>Год (постройки): </label>
                        <input type={"number"} {...register("created_year")} defaultValue={s.created_year}/>
                    </div>
                    <div className="form-row">
                        <label>Описание: </label>
                        <textarea {...register("description")} defaultValue={s.description}/>
                    </div>
                    <div>
                        <button type="button" onClick={deleteSight}>Удалить</button>
                    </div>
                    <Line/>
                    <h3>Посещение</h3>
                    <div className="form-row">
                        <label>Дата посещения: </label>
                        <input type="date" autoComplete="off" onChange={(event)=>{
                            setDate(event.target.value)
                        }}
                               defaultValue={s.visited_date} />
                    </div>
                    <div className="form-row even">
                        <button type="button" onClick={deleteVisit}>Удалить</button>
                        <button type="submit">Сохранить</button>
                    </div>
                    <input defaultValue={s.trippoint_id} {...register("trippoint_id")} hidden={true}/>
                    <input defaultValue={s.sight_id} {...register("sight_id")} hidden={true}/>
                </form>
            </Modal>
        </>
    );
}

export default SightBlock;