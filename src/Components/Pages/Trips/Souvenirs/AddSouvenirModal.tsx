import React, {useState} from 'react';
import Modal from "../../../Fragments/Modal";
import {City, Souvenir, TripPoint} from "../../../../Helpers/DataTypes";
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
    const {register, handleSubmit} = useForm<Souvenir>()
    const [selectedMaterial,setMat]=useState("");
    const [selectedType, setType]=useState("");
    const [selectedCity, setCity]=useState<string>("");
    const [materials, loadMaterials] = useFetch<string[]>("souvenirs/materials/")
    const [types, loadTypes] = useFetch<string[]>("souvenirs/types/")
    const [cities]=useFetch<City[]>("cities/")
    const [close, closeModal] = useSwitch();
    if(!materials || !types) return <LoadingError loadingObject={"параметры"} loading={loadMaterials||loadTypes} wholePage={true}/>

    const submit = handleSubmit((s)=>{
        s.trippoint_id=selectedPoint.trippoint_id;
        s.type=selectedType;
        s.material=selectedMaterial;
        s.city=selectedCity;
        post("souvenirs/create/", JSON.stringify(s)).then(()=>{
            closeModal()
            onCommit()
        })
    } )
    return (
        <>
            <Modal header={"Новый сувенир"} openRef={openRef} offToggle={close}>
                <form className="vert-window" onSubmit={submit}>
                    <p>Относится к остановке:</p>
                    <ButtonSelect<TripPoint> array={points} id="points" stringify=
                        {(p) => p.title} onSelect={(p) => setPoint(p)}/>
                    <div className="form-row">
                        <label>Название: </label>
                        <input required={true} {...register("name")}/>
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
                                     id={"allCities"} not_required={true} onlySelect={true}/>
                    </div>
                    <button type="submit">Добавить</button>
                </form>
            </Modal>
        </>
    );
}

export default AddSouvenirModal;