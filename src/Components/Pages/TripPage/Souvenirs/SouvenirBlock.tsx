import React, {useRef, useState} from 'react';
import {City, Souvenir} from "../../../../Helpers/DataTypes";
import Modal from "../../../Fragments/Modal";
import {post} from "../../../../Server/Requests";
import useSwitch from "../../../../Hooks/useSwitch";
import ButtonSelectWithInput from "../../../Fragments/ButtonSelectWithInput";
import useFetch from "../../../../Hooks/useFetch";
import {useForm} from "react-hook-form";
import SearchInput from "../../../Fragments/SearchInput";

function SouvenirBlock({s, onChange}:{s:Souvenir, onChange:()=>void}) {
    const editSouvenirRef = useRef(null)
    const [closeModal, flip] = useSwitch()
    const [materials, loadMaterials] = useFetch<string[]>("souvenirs/materials/")
    const [types, loadTypes] = useFetch<string[]>("souvenirs/types/")
    const [cities] = useFetch<City[]>("cities/")
    const [newMaterial, setMaterial] = useState<string>(s.material)
    const [newType, setType] = useState<string>(s.type)
    const {register, handleSubmit} = useForm<Souvenir>()
    const shortSummary = <h3>{s.type&&<span>{s.type}</span>}{s.material&&<span> {s.material}</span>}</h3>
    const cityFieldRef=useRef<HTMLInputElement>(null)
    function deleteSouvenir() {
        if(confirm("Вы собираетесь удалить "+s.name+". Продолжить?"))
            post("souvenirs/delete/", JSON.stringify(s)).then(()=>{flip();onChange()})
    }
    const saveSouvenir = handleSubmit((newS:Souvenir, e?)=>{
        e!.preventDefault()
        newS.material=newMaterial;
        newS.type=newType;
        newS.city = cityFieldRef.current!.value
        console.log(newS)
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
                    <div className="form-row">
                        <label>Название: </label>
                        <input defaultValue={s.name} {...register("name")}/>
                    </div>

                    {materials&&
                        <ButtonSelectWithInput<string> array={materials} id={"editMaterials"} defaultValue={s.material}
                                                               stringify={(s)=>s} onSelect={(s)=>{
                                                                   console.log(s)
                                                                    setMaterial(s)
                        }}/>}

                    {types&&
                        <ButtonSelectWithInput<string> array={types} id={"editTypes"} defaultValue={s.type}
                                                               stringify={(s)=>s} onSelect={(s)=>{
                                                                   console.log(s)
                                                                    setType(s)
                        }}/>}
                    <div className="form-row">
                        <label>Город: </label>
                        <SearchInput id={"citiesForS"} array={cities} stringify={(c)=>c.city} not_required={true}
                             myRef={cityFieldRef} onSetValue={(s)=>(s)} defaultValue={s.city} onlySelect={true}/>
                    </div>
                    <div className="form-row">
                        <label>Описание: </label>
                        <textarea defaultValue={s.description} {...register("description")}/>
                    </div>
                    <input defaultValue={s.trippoint_id} {...register("trippoint_id")} hidden={true}/>
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