import React, {useState} from 'react';
import {Country, Trip} from "../../../Helpers/DataTypes";
import Modal from "../../Fragments/Modal";
import {post} from "../../../././Server/Requests";
import {useForm} from "react-hook-form";
import useSwitch from "../../../Hooks/useSwitch";

function AddCountryModal({addCountryButton, onAdd}:{onAdd:{():void}
    addCountryButton:React.MutableRefObject<HTMLElement|null>}) {
    const [toggleModal, setToggle] = useSwitch()
    const {register, handleSubmit} = useForm<Country>();
    const onSubmit = handleSubmit((data,e?: React.BaseSyntheticEvent)=>{
        e!.preventDefault()
        console.log(data)
        post("countries/create/", JSON.stringify(data)).then(()=>setToggle())
    })
    return (
        <Modal header="Добавить страну" openRef={addCountryButton} offToggle={toggleModal}>
            <form className="vert-window" onSubmit={onSubmit}>
                <div className="form-row">
                    <label>Название</label>
                    <input required={true} {...register("country")}/>
                </div>
                <div className="form-row">
                    <label>Население</label>
                    <input {...register("population")}/>
                </div>
                <div className="form-row">
                    <label>Площадь</label>
                    <input {...register("area")}/>
                </div>
                <button type="submit">Добавить</button>
            </form>
        </Modal>
    );
}

export default AddCountryModal;