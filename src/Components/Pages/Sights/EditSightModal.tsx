import React, {useEffect, useState} from 'react';
import {City, Sight, SightVisitCombined} from "../../../Helpers/DataTypes";
import Modal from "../../Fragments/Modal";
import {useForm} from "react-hook-form";
import {post} from "../../../Server/Requests";
import SearchInput from "../../Fragments/SearchInput";
import Line from "../../Fragments/Line";
import ButtonSelectWithInput from "../../Fragments/ButtonSelectWithInput";
import useSwitch from "../../../Hooks/useSwitch";

function EditSightModal({s, onChange, openRef, cities, types}:{s:Sight, onChange:()=>void, openRef:React.MutableRefObject<any>,
cities?:City[], types?:string[]}) {
    const [close, flip] = useSwitch()
    const [selectedCity, setCity] = useState<string>(s.city)
    const [selectedType, setType] = useState<string>(s.type)
    const {register, handleSubmit} = useForm<SightVisitCombined>()


    const onSubmit=handleSubmit((newVisit:Sight, e?)=>{
        e!.preventDefault()
        newVisit.city=selectedCity;
        newVisit.type=selectedType;
        post("sights/update/", JSON.stringify(newVisit)).then(()=>{onChange();flip();})
    })
    return (
        <Modal header={"Изменить данные"} openRef={openRef} offToggle={close} positioning="absolute">
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
                <button type="submit">Сохранить</button>
                <input defaultValue={s.sight_id} {...register("sight_id")} hidden={true}/>
            </form>
        </Modal>
    );
}

export default EditSightModal;