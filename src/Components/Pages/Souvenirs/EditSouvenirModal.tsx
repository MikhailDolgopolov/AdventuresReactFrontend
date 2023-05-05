import React, {useState} from 'react';
import ButtonSelectWithInput from "../../Fragments/ButtonSelectWithInput";
import SearchInput from "../../Fragments/SearchInput";
import ButtonSelect from "../../Fragments/ButtonSelect";
import Modal from "../../Fragments/Modal";
import useFetch from "../../../Hooks/useFetch";
import {City, Souvenir, TripPoint} from "../../../Helpers/DataTypes";
import useSwitch from "../../../Hooks/useSwitch";
import {useForm} from "react-hook-form";
import {post} from "../../../Server/Requests";

function EditSouvenirModal({s, editSouvenirRef, onChange, trippoints, types, materials, cities}:{s:Souvenir, onChange:()=>void, trippoints:TripPoint[],
    types?:string[], materials?:string[], cities?:City[], editSouvenirRef:React.MutableRefObject<any>}) {
    const [currPoint] = useFetch<TripPoint>("trippoints/"+s.trippoint_id)
    const [closeModal, flip] = useSwitch()

    const [newMaterial, setMaterial] = useState<string>(s.material)
    const [newType, setType] = useState<string>(s.type)
    const [newCity, setCity] = useState<string>(s.city)
    const [newPoint, setPoint] = useState<number>(s.trippoint_id)
    const {register, handleSubmit} = useForm<Souvenir>()


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
        <Modal header="Изменить данные" openRef={editSouvenirRef} offToggle={closeModal}>
            <form className="vert-window" onSubmit={saveSouvenir}>
                <input hidden={true} defaultValue={s.souvenir_id} {...register("souvenir_id")}/>
                <div className="form-row">
                    <label>Название: </label>
                    <input defaultValue={s.name} {...register("name")}/>
                </div>
                <div>Материал:
                    {materials &&
                        <ButtonSelectWithInput<string> array={materials} id={"editMaterials"} defaultValue={s.material}
                                                       stringify={(s) => s} onSelect={(s) => {
                            setMaterial(s)
                        }}/>}</div>
                <div>Тип:
                    {types &&
                        <ButtonSelectWithInput<string> array={types} id={"editTypes"} defaultValue={s.type}
                                                       stringify={(s) => s} onSelect={(s) => {
                            setType(s)
                        }}/>}</div>
                <div className="form-row">
                    <label>Город: </label>
                    <SearchInput id={"citiesForS"} array={cities} stringify={(c)=>c.city} not_required={true}
                                 onSetValue={(s)=>setCity(s)} defaultValue={s.city} onlySelect={true}/>
                </div>
                <div className="form-row">
                    <label>Описание: </label>
                    <textarea defaultValue={s.description} {...register("description")}/>
                </div>
                Относится к остановке:
                {currPoint&&<ButtonSelect array={trippoints} id={"tp"} stringify={(tp)=>tp.title}
                                          onSelect={(tp)=>setPoint(tp.trippoint_id)} defaultValue={currPoint.title}/>}
                <button type="submit">Сохранить</button>
            </form>
        </Modal>
    );
}

export default EditSouvenirModal;