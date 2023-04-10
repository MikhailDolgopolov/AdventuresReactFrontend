import React, {useState} from 'react';
import {Country, Trip} from "../../../Helpers/DataTypes";
import Modal from "../../Fragments/Modal";
import {post} from "../../../././Server/Requests";
import {useForm} from "react-hook-form";

function AddCountryModal({addCountryButton, onAdd}:{onAdd:{():void}
    addCountryButton:React.MutableRefObject<HTMLElement|null>}) {
    const [toggleModal, setToggle] = useState<boolean>(true);
    const {register, handleSubmit} = useForm<Country>();
    const onSubmit = handleSubmit((data,e?: React.BaseSyntheticEvent)=>{
        e!.preventDefault()
        console.log(data)
    })
    return (
        <Modal header="Добавить страну" openRef={addCountryButton} offToggle={toggleModal}>
            <form className="vert-window" onSubmit={()=>console.log("here")}>
                <div className="form-row">
                    <label>Название</label>
                    <input required={true} {...register("country")}/>
                </div>
                <div className="form-row">
                    <label>Население (чел)</label>
                    <input {...register("population")}/>
                </div>
                <div className="form-row">
                    <label>Площадь (млн км<sup>2</sup>)</label>
                    <input {...register("area")}/>
                </div>
                <button type="submit" onClick={()=>console.log("click")}>Добавить</button>
            </form>
        </Modal>
    );
}

export default AddCountryModal;