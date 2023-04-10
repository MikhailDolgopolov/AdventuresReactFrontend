import React, {useState} from 'react';
import Modal from "../../Fragments/Modal";
import {useForm} from "react-hook-form";
import {Trip} from "../../../Helpers/DataTypes";
import {post} from "../../../././Server/Requests";
import {redirect} from "react-router-dom";

function EditTripModal({trip, editRef, setTrip}:{trip:Trip, setTrip:{(arg0:Trip):void}
    editRef:React.MutableRefObject<HTMLElement|null>}) {
    const {register, handleSubmit} = useForm<Trip>();
    const [toggle, setToggle] = useState<boolean>(true)
    const onSubmit = handleSubmit((data)=>{
        post("trips/update/", JSON.stringify(data)).then((res)=>{
            setToggle(!toggle)
            setTrip(res)})
        redirect('/trips/'+trip.trip_id)
    },()=>{
        setToggle(true)
    })
    return (
        <Modal header="Изменить" openRef={editRef} offToggle={toggle} >
            <form className="vert-window" onSubmit={onSubmit}>
                <div className="form-row">
                    <label >Название: </label>
                    <input  required={true} {...register("title")} defaultValue={trip.title}/>
                </div>
                <div className="form-row">
                    <label >Начало: </label>
                    <input required={true} {...register("start_date")} defaultValue={trip.start_date}/>
                </div>
                <div className="form-row">
                    <label >Окончание: </label>
                    <input {...register("end_date")} defaultValue={trip.end_date}/>
                </div>
                <div className="form-row">
                    <label >Описание: </label>
                    <input {...register("description")} defaultValue={trip.description}/>
                </div>
                <input {...register("trip_id")} value={trip.trip_id} hidden={true}/>
                <input {...register("photo_link")} value={(trip.photo_link)?trip.photo_link:""} hidden={true}/>
                <button type="submit">Сохранить</button>
            </form>

        </Modal>
    );
}

export default EditTripModal;