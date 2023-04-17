import React, {useRef, useState} from 'react';
import {City, Souvenir, TripPoint} from "../../../../Helpers/DataTypes";
import Modal from "../../../Fragments/Modal";
import {post} from "../../../../Server/Requests";
import useSwitch from "../../../../Hooks/useSwitch";
import ButtonSelectWithInput from "../../../Fragments/ButtonSelectWithInput";
import useFetch from "../../../../Hooks/useFetch";
import {useForm} from "react-hook-form";
import SearchInput from "../../../Fragments/SearchInput";
import ButtonSelect from "../../../Fragments/ButtonSelect";

function SouvenirBlock({s, onChange, trippoints}:{s:Souvenir, onChange:()=>void, trippoints:TripPoint[]}) {
    const editSouvenirRef = useRef(null)
    const [currPoint] = useFetch<TripPoint>("trippoints/"+s.trippoint_id)
    const [closeModal, flip] = useSwitch()
    const [materials] = useFetch<string[]>("souvenirs/materials/")
    const [types] = useFetch<string[]>("souvenirs/types/")
    const [cities] = useFetch<City[]>("cities/")
    const [newMaterial, setMaterial] = useState<string>(s.material)
    const [newType, setType] = useState<string>(s.type)
    const [newCity, setCity] = useState<string>(s.city)
    const [newPoint, setPoint] = useState<number>(s.trippoint_id)
    const {register, handleSubmit} = useForm<Souvenir>()
    //const shortSummary = <h3>{s.type&&<span>{s.type}</span>}{s.material&&<span> {s.material}</span>}</h3>

    function deleteSouvenir() {
        if(confirm("Вы собираетесь удалить "+s.name+". Продолжить?"))
            post("souvenirs/delete/", JSON.stringify(s)).then(()=>{flip();onChange()})
    }
    const saveSouvenir = handleSubmit((newS:Souvenir, e?)=>{
        e!.preventDefault()
        newS.material=newMaterial;
        newS.type=newType;
        newS.city = newCity;
        newS.trippoint_id=newPoint;
        post("souvenirs/update/", JSON.stringify(newS)).then(()=>{
            flip();onChange()})
    })
    return (
        <>
            <button className="flex-block highlight" key={s.souvenir_id} ref={editSouvenirRef}>
                <h3>{s.type&&<span>{s.type}</span>}{s.material&&<span> {s.material}</span>}</h3>
                <p></p>
                {s.name}
                {s.city&&<h5>{s.city}</h5>}
            </button>
            <Modal header="Изменить данные" openRef={editSouvenirRef} offToggle={closeModal}>
                <form className="vert-window" onSubmit={saveSouvenir}>
                    <input hidden={true} defaultValue={s.souvenir_id} {...register("souvenir_id")}/>
                    <div className="form-row">
                        <label>Название: </label>
                        <input defaultValue={s.name} {...register("name")}/>
                    </div>
                    Материал:
                    {materials&&
                        <ButtonSelectWithInput<string> array={materials} id={"editMaterials"} defaultValue={s.material}
                                                               stringify={(s)=>s} onSelect={(s)=>{
                                                                    setMaterial(s)
                        }}/>}
                    Тип:
                    {types&&
                        <ButtonSelectWithInput<string> array={types} id={"editTypes"} defaultValue={s.type}
                                                               stringify={(s)=>s} onSelect={(s)=>{
                                                                    setType(s)
                        }}/>}
                    <div className="form-row">
                        <label>Город: </label>
                        <SearchInput id={"citiesForS"} array={cities} stringify={(c)=>c.city} not_required={true}
                             onSetValue={(s)=>setCity(s)} defaultValue={s.city} onlySelect={true}/>
                    </div>
                    <div className="form-row">
                        <label>Описание: </label>
                        <textarea defaultValue={s.description} {...register("description")}/>
                    </div>
                    {currPoint&&<ButtonSelect array={trippoints} id={"tp"} stringify={(tp)=>tp.title}
                                  onSelect={(tp)=>setPoint(tp.trippoint_id)} defaultValue={currPoint.title}/>}
                    <div className="form-row">
                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={deleteSouvenir}>Удалить</button>
                    </div>

                </form>
            </Modal>
        </>
    );
}

export default SouvenirBlock;