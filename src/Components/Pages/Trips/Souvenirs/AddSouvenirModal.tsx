import React, {useEffect, useState} from 'react';
import Modal from "../../../Fragments/Modal";
import {City, Country, Souvenir, TripPoint} from "../../../../Helpers/DataTypes";
import ButtonSelect from "../../../Fragments/ButtonSelect";
import {useForm} from "react-hook-form";
import useFetch from "../../../../Hooks/useFetch";
import LoadingError from "../../LoadingError";
import useSwitch from "../../../../Hooks/useSwitch";
import ButtonSelectWithInput from "../../../Fragments/ButtonSelectWithInput";
import SearchInput from "../../../Fragments/SearchInput";
import {post} from "../../../../Server/Requests";

function AddSouvenirModal({points, openRef, onCommit}:{points:TripPoint[], openRef:React.MutableRefObject<any>, onCommit:()=>void}) {
    const [selectedPoint, setPoint] = useState<TripPoint>(points[0])
    const {register, handleSubmit, reset} = useForm<Souvenir>()
    const [selectedMaterial,setMat]=useState("");
    const [selectedType, setType]=useState("");
    const [selectedCity, setCity]=useState<string>(selectedPoint.city);
    const [refetchCountry, flipRefetchCountry] = useSwitch()
    const [currentCountry] = useFetch<Country>("countries/for_city/"+selectedPoint.city, refetchCountry)
    const [materials, loadMaterials] = useFetch<string[]>("souvenirs/materials/")
    const [types, loadTypes] = useFetch<string[]>("souvenirs/types/")
    const [cities]=useFetch<City[]>("cities/")
    const [close, closeModal] = useSwitch();

    useEffect(()=>{
        if(types && types.length>0) setType(types[0])
        if(materials&&materials.length>0) setMat(materials[0])
    },[types, materials])
    if(!materials || !types) return <LoadingError loadingObject={"параметры"} loading={loadMaterials||loadTypes} wholePage={true}/>
    const submit = handleSubmit((s)=>{
        if(!cities) {alert("Подождите немного и попробуйте еще раз."); return;}
        s.trippoint_id=selectedPoint.trippoint_id;
        s.type=selectedType;
        s.material=selectedMaterial;
        s.city=selectedCity;
        const citySeek = cities.find(c=>c.city==selectedCity)
        if(!citySeek) {
            if (!currentCountry) {
                alert("Подождите немного... Нужно немного времени.");
                return;
            }
            const newCity: City = {city: selectedCity, country: currentCountry.country, founded_year: 0, population: 0}
            if (confirm(currentCountry.country + ": будет добавлен город " + selectedCity.toString() + ".")) {
                post("cities/create/", JSON.stringify(newCity)).then(() =>
                    post("souvenirs/create/", JSON.stringify(s)).then(() => {
                        closeModal()
                        onCommit()
                    }))
            }
        } else
            post("souvenirs/create/", JSON.stringify(s)).then(()=>{
                closeModal()
                onCommit()})
    } )
    return (
        <>
            <Modal header={"Новый сувенир"} openRef={openRef} offToggle={close} positioning="absolute"
                   onClose={()=>reset({name:"", description:""})}>
                <form className="vert-window" onSubmit={submit}>
                    <p>Относится к остановке:</p>
                    <ButtonSelect<TripPoint> array={points} id="points" stringify=
                        {(p) => p.title} onSelect={(p) => {setPoint(p);setCity(p.city)}}/>
                    <div className="form-row">
                        <label>Название: </label>
                        <input {...register("name")}/>
                    </div>
                    Материал:
                    <ButtonSelectWithInput<string> array={materials} id="materials" stringify={(s)=>s}
                                          onSelect={(s)=>setMat(s)}/>
                    Тип:
                    <ButtonSelectWithInput<string> array={types} id="types" stringify={(s)=>s}
                                          onSelect={(s)=>setType(s)}/>
                    <div className="form-row">
                        <label>Город: </label>
                        <SearchInput array={cities} stringify={(c)=>c.city} onSetValue={(s)=>setCity(s)}
                                     id={"allCities"} not_required={true} defaultValue={selectedPoint&&selectedPoint.city}/>
                    </div>
                    <div className="form-row">
                        <label>Описание: </label>
                        <textarea {...register("description")}/>
                    </div>
                    <button type="submit">Добавить</button>
                </form>
            </Modal>
        </>
    );
}

export default AddSouvenirModal;