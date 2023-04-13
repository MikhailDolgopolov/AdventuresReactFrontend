import {City, TripPoint} from "../../../Helpers/DataTypes";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {post} from "../../../././Server/Requests";
import Modal from "../../Fragments/Modal";
import SearchInput from "../../Fragments/SearchInput";

function EditTripPointModal({point, editRef, setPoint, cities}:
           {point:TripPoint, setPoint:{(arg0:TripPoint):void}, editRef:React.MutableRefObject<HTMLElement|null>,
                            cities:City[]}) {
    const {register, handleSubmit} = useForm<TripPoint>();
    const [toggle, setToggle] = useState<boolean>(true)
    const [selectedCity, setCity] = useState<string>(point.city)
    const onSubmit = handleSubmit((data)=>{
        data.city=selectedCity
        if(selectedCity==data.city && point.title==data.title) {
            alert("Значения либо не были изменены, либо были изменены на некорректные. Данные не будут изменены.")
            return
        }

        post("trippoints/update/", JSON.stringify(data)).then((res)=> {
            setToggle(!toggle)
            setPoint(res)
        })
    })

    return (
        <Modal header="Изменить" openRef={editRef} offToggle={toggle} >
            <form className="vert-window" onSubmit={onSubmit}>
                <div className="form-row">
                    <label >Название: </label>
                    <input  required={true} {...register("title")} defaultValue={point.title}/>
                </div>
                <div className="form-row">
                    <label>Город: </label>
                    <SearchInput<City> id="city" array={cities} defaultValue={point.city}
                                       stringify={(item) => item.city}
                                       onSetValue={(city) => {setCity(city)}}
                    />
                </div>

                <input {...register("trip_id")} value={point.trip_id} hidden={true}/>
                <input {...register("trippoint_id")} value={point.trippoint_id} hidden={true}/>
                <button type="submit">Сохранить</button>
            </form>
        </Modal>
    );
}

export default EditTripPointModal;