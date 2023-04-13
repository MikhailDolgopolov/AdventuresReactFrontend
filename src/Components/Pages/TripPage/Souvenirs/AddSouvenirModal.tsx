import React, {useRef, useState} from 'react';
import TrippointsList from "../TrippointsList";
import Modal from "../../../Fragments/Modal";
import {Sight, Souvenir, Trip, TripPoint} from "../../../../Helpers/DataTypes";
import ButtonSelect from "../../../Fragments/ButtonSelect";
import {useForm} from "react-hook-form";
import useFetch from "../../../../Hooks/useFetch";
import LoadingError from "../../LoadingError";
import useSwitch from "../../../../Hooks/useSwitch";
import ButtonSelectWithInput from "../../../Fragments/ButtonSelectWithInput";

function AddSouvenirModal({trip, points, openRef}:{trip:Trip, points:TripPoint[], openRef:React.MutableRefObject<any>}) {
    const [selectedPoint, setPoint] = useState<TripPoint>(points[0])
    const {register, handleSubmit} = useForm<Souvenir>()
    const [newMat,setMat]=useSwitch();
    const [newType, setType]=useSwitch();
    const [materials, loadMaterials] = useFetch<string[]>("souvenirs/materials/")
    const [types, loadTypes] = useFetch<string[]>("souvenirs/types/")
    if(!materials || !types) return <LoadingError loadingObject={"параметры"} loading={loadMaterials||loadTypes} wholePage={true}/>

    const submit = handleSubmit((s)=>{
        s.trippoint_id=selectedPoint.trippoint_id;
    } )
    return (
        <>
            <Modal header={"Новый сувенир"} openRef={openRef}>
                <form className="vert-window" onSubmit={submit}>
                    <p>Относится к остановке:</p>
                    <ButtonSelect<TripPoint> array={points} id="points" stringify=
                        {(p) => p.title} onSelect={(p) => setPoint(p)}/>
                    <div className="form-row">
                        <label>Название: </label>
                        <input required={true}/>
                    </div>
                    Материал:
                    <ButtonSelectWithInput<string> array={materials} id="materials" stringify={(s)=>s}
                                          onSelect={(s)=>0}/>
                    Тип:
                    <ButtonSelectWithInput<string> array={types} id="types" stringify={(s)=>s}
                                          onSelect={(s)=>console.log("-- "+s)}/>

                    <button type="submit">Добавить</button>
                </form>
            </Modal>
        </>
    );
}

export default AddSouvenirModal;