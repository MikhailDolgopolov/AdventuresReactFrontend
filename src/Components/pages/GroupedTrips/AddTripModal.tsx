import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Trip} from "../../../Helpers/Types";
import {post} from "../../../Server/Requests";
import Modal from "../../Modal";
import LoadingError from "../LoadingError";

function AddTripModal({allTrips, addTripButton, onAdd}:{allTrips?:Trip[], onAdd:{():void}
    addTripButton:React.MutableRefObject<HTMLElement|null>}) {
    const [toggleModal, setToggle] = useState<boolean>(true);
    const {register, handleSubmit} = useForm<Trip>();
    if(!allTrips) return <LoadingError loadingObject={"trips"}/>
    const onSubmit = handleSubmit((data)=>{
        let seek = allTrips.find(trip=>(data.title==trip.title));
        if(seek){
            alert("Taкое путешествие уже добавлено.");
        }else{
            post('trips/create/', JSON.stringify(data)).then(()=>{
                setToggle(!toggleModal)
                onAdd()
            });
        }
    })


    return (
        <Modal header="Новое путешествие" openRef={addTripButton} offToggle={toggleModal}>
            <form className="vert-window" onSubmit={onSubmit}>
                <div className="form-row">
                    <label >Название: </label>
                    <input  required={true} {...register("title")}/>
                </div>
                <div className="form-row">
                    <label >Начало: </label>
                    <input type="date" required={true} {...register("start_date")}/>
                </div>
                <div className="form-row">
                    <label >Окончание: </label>
                    <input type="date" {...register("end_date")}/>
                </div>
                <div className="form-row">
                    <label >Описание: </label>
                    <input {...register("description")}/>
                </div>
                <input {...register("trip_id")} value={0} hidden={true}/>
                <input {...register("photo_link")} value={""} hidden={true}/>
                <button type="submit">Добавить</button>
            </form>
        </Modal>
    );
}

export default AddTripModal;