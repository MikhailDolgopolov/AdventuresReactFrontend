import React from 'react';
import {Country} from "../../../Helpers/DataTypes";
import Modal from "../../Fragments/Modal";
import {post} from "../../../Server/Requests";
import {useForm} from "react-hook-form";
import useSwitch from "../../../Hooks/useSwitch";

function AddCountryModal({addCountryButton, onAdd}:{onAdd:()=>void,
    addCountryButton:React.MutableRefObject<HTMLElement|null>}) {
    const [toggleModal, setToggle] = useSwitch()
    const {register, handleSubmit, reset} = useForm<Country>();
    const onSubmit = handleSubmit((data,e?: React.BaseSyntheticEvent)=>{
        e!.preventDefault()
        post("countries/create/", JSON.stringify(data)).then(()=>{onAdd();setToggle();})
    })
    return (
        <Modal header="Добавить страну" openRef={addCountryButton} offToggle={toggleModal} onClose={reset}>
            <form className="vert-window" onSubmit={onSubmit}>
                <div className="form-row">
                    <label>Название</label>
                    <input required={true} {...register("country")}/>
                </div>
                <div className="form-row">
                    <label>Население</label>
                    <input type="number" {...register("population")}/>
                </div>
                <div className="form-row">
                    <label>Площадь</label>
                    <input type="number" {...register("area")}/>
                </div>
                <div className="form-row">
                    <label>Столица</label>
                    <input {...register("capital_city")}/>
                </div>
                <button type="submit">Добавить</button>
            </form>
        </Modal>
    );
}

export default AddCountryModal;