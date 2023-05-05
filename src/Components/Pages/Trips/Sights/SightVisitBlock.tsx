import React, {useEffect, useRef, useState} from 'react';
import {City, SightVisitCombined, TripPoint} from "../../../../Helpers/DataTypes";
import Modal from "../../../Fragments/Modal";
import {post} from "../../../../Server/Requests";
import useSwitch from "../../../../Hooks/useSwitch";
import useFetch from "../../../../Hooks/useFetch";
import {useForm} from "react-hook-form";
import SearchInput from "../../../Fragments/SearchInput";
import ButtonSelectWithInput from "../../../Fragments/ButtonSelectWithInput";
import Line from "../../../Fragments/Line";
import {useNavigate} from "react-router-dom";
import OptionalFormRow from "../../Sights/OptionalFormRow";

function SightVisitBlock({s, onChange, cities, types}:{s:SightVisitCombined, onChange:()=>any, cities?:City[], types?:string[]}) {
    const editSightRef = useRef(null)
    const navigate=useNavigate()
    const [closeModal, flip] = useSwitch()

    const [selectedDate, setDate] = useState<string>("")
    const {register, handleSubmit} = useForm<SightVisitCombined>()


    const onSubmit=handleSubmit((newVisit:SightVisitCombined, e?)=>{
        e!.preventDefault()
        newVisit.visited_date=selectedDate
        post("sights/update_visit_date/", JSON.stringify(newVisit)).then(()=>{flip();onChange();})
        })
    useEffect(()=>{
        setDate(s.visited_date);
    },[])

    function deleteVisit() {
        if(window.confirm(s.name+" исчезнет из списка посещенных мест. Продолжить?"))
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
            <Modal header={s.name} openRef={editSightRef} offToggle={closeModal}>
                <form className="vert-window" onSubmit={onSubmit}>
                    <input hidden={true} defaultValue={s.sight_id} {...register("sight_id")}/>
                    <input hidden={true} defaultValue={s.trippoint_id} {...register("trippoint_id")}/>
                    <OptionalFormRow label="Город:  " value={s.city}/>
                    <div className="form-row">
                        <label>Тип:</label>
                        <p>{s.type}</p>
                    </div>
                    <OptionalFormRow label={"Год:  "} number={s.created_year}/>
                    <OptionalFormRow label={"Описание:  "} value={s.description}/>
                    <button type="button" onClick={()=>navigate("/sights/"+s.sight_id)}>Перейти на страницу</button>
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

export default SightVisitBlock;