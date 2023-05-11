import React, {useEffect, useState} from 'react';
import ButtonSelectWithInput from "../../Fragments/ButtonSelectWithInput";
import SearchInput from "../../Fragments/SearchInput";
import ButtonSelect from "../../Fragments/ButtonSelect";
import Modal from "../../Fragments/Modal";
import useFetch from "../../../Hooks/useFetch";
import {City, Country, Souvenir, TripPoint} from "../../../Helpers/DataTypes";
import useSwitch from "../../../Hooks/useSwitch";
import {useForm} from "react-hook-form";
import {post} from "../../../Server/Requests";

function EditSouvenirModal({s, editSouvenirRef, onChange, trippoints, types, materials, cities}:{s:Souvenir, onChange:()=>void, trippoints:TripPoint[],
    types?:string[], materials?:string[], cities?:City[], editSouvenirRef:React.MutableRefObject<any>}) {
    const [currPoint] = useFetch<TripPoint>("trippoints/"+s.trippoint_id)
    const [closeModal, flip] = useSwitch()

    const [newMaterial, setMaterial] = useState<string>(s.material)
    const [newType, setType] = useState<string>(s.type)
    const [selectedCity, setCity] = useState<string>(s.city)
    const [refetchCountry, flipRefetchCountry] = useSwitch()
    const [newPoint, setPoint] = useState<TripPoint>(trippoints[0])
    const [currentCountry] = useFetch<Country>("countries/for_city/"+newPoint.city, refetchCountry)

    const {register, handleSubmit} = useForm<Souvenir>()

    useEffect(()=>{
        if(currPoint) setPoint(currPoint)
    },[currPoint])
    const saveSouvenir = handleSubmit((newS:Souvenir, e?)=>{
        if (!cities) return;
        e!.preventDefault()
        newS.material=newMaterial;
        newS.type=newType;
        newS.city = selectedCity;
        newS.trippoint_id=newPoint.trippoint_id;
        const citySeek = cities.find(c=>c.city==selectedCity)
        if(!citySeek && selectedCity){
            if(!currentCountry) return;
            const newCity:City = {city:selectedCity, country:currentCountry.country, founded_year:0, population:0}
            if(confirm(currentCountry.country+": будет добавлен город "+selectedCity.toString()+"."))
                post("cities/create/", JSON.stringify(newCity)).then(()=>
                    post("souvenirs/update/", JSON.stringify(newS)).then(()=>{
                        flip();onChange()}))
        }else
            post("souvenirs/update/", JSON.stringify(newS)).then(()=>{
                flip();onChange()})
    })
    return (
        <Modal header="Изменить данные" openRef={editSouvenirRef} offToggle={closeModal} positioning="absolute">
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
                                 onSetValue={(s)=>{setCity(s);flipRefetchCountry()}} defaultValue={s.city&&newPoint.city}/>
                </div>
                <div className="form-row">
                    <label>Описание: </label>
                    <textarea defaultValue={s.description} {...register("description")}/>
                </div>
                Относится к остановке:
                {currPoint&&<ButtonSelect array={trippoints} id={"tp"} stringify={(tp)=>tp.title}
                                          onSelect={(tp)=>setPoint(tp)} defaultValue={currPoint.title}/>}
                <button type="submit">Сохранить</button>
            </form>
        </Modal>
    );
}

export default EditSouvenirModal;