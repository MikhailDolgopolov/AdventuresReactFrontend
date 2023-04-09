import React, {useEffect, useRef} from 'react';
import Modal from "../../Fragments/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";
import {Souvenir, Trip, TripPoint} from "../../../Helpers/DataTypes";
import LoadingError from "../LoadingError";
import useFetch from "../../../Hooks/useFetch";
import MyInput from "../../../Helpers/MyInput";
import FormSearchInput from "../../Fragments/FormSearchInput";
import useLogger from "../../../Hooks/useLogger";
import SearchInput from "../../Fragments/SearchInput";
import {post} from "../../../Server/Requests";
import useSwitch from "../../../Hooks/useSwitch";
import SouvenirList from "./SouvenirList";

function TrippointSouvenirs({trip, point}:{trip:Trip, point:TripPoint}) {

    const [refetch, setRefetch] = useSwitch()
    const [souvenirs, loadingSouvenirs, errorSouvenirs] = useFetch<Souvenir[]>("souvenirs/for_trippoint/"+point.trip_point_id, refetch)
    const addSouvenirRef = useRef(null)
    const {register, handleSubmit} = useForm<Souvenir>()
    let souvenirType:string;
    if(!souvenirs) return <LoadingError loadingObject={"сувениры"} loading={loadingSouvenirs}/>
    const onFormSubmit = (newSouvenir:Souvenir, e?: React.BaseSyntheticEvent)=>{
        e!.preventDefault()
        newSouvenir.type = souvenirType
        console.log(newSouvenir)
        post("souvenirs/create/", JSON.stringify(newSouvenir), true).then(()=>setRefetch())
    }

    const types:string[] = ["колокольчик", "остальное"]
    return (
        <div>
            <Modal header={"Новый сувенир"} openRef={addSouvenirRef}>
                <form className="vert-window" onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="form-row">
                        <label>Название: </label>
                        <input {...register("name")} required={true}/>
                    </div>
                    <div className="form-row">
                        <label>Тип </label>
                        <SearchInput<string> array={types} id={"souvtype"}
                            stringify={(x:string)=>x} onSetValue={(val)=>souvenirType=val}/>
                    </div>
                    <div className="form-row">
                        <label>Материал: </label>
                        <input {...register("material")}/>
                    </div>
                    <div className="form-row">
                        <label>Описание: </label>
                        <input {...register("description")}/>
                    </div>
                    <input hidden={true} defaultValue={point.trip_point_id} {...register("trip_point_id")}/>
                    <input hidden={true} defaultValue={point.city} {...register("city")}/>
                    <button type={"submit"}>Click</button>
                </form>
            </Modal>

            <section>
                <h2>Сувениры</h2>
                <SouvenirList souvenirs={souvenirs}/>
                <button className="big" ref={addSouvenirRef}>
                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                </button>
            </section>
        </div>
    );
}

export default TrippointSouvenirs;