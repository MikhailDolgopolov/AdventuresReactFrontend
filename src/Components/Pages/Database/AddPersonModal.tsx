import React from 'react';
import {useForm} from "react-hook-form";
import {Person} from "../../../Helpers/DataTypes";
import Modal from "../../Fragments/Modal";
import {post} from "../../../Server/Requests";
import useSwitch from "../../../Hooks/useSwitch";

function AddPersonModal({addPersonButton, onAdd}:{onAdd:{():void}
    addPersonButton:React.MutableRefObject<HTMLElement|null>}) {
    const [toggleModal, flip] = useSwitch();
    const {register, handleSubmit} = useForm<Person>();
    const onSubmit = handleSubmit((data, e?: React.BaseSyntheticEvent)=>{
        e!.preventDefault()
        post("people/create/", JSON.stringify(data)).then(()=>{onAdd();flip(); });
    })

    return (
        <Modal header="Добавить человека" openRef={addPersonButton} offToggle={toggleModal}>
            <form className="vert-window" onSubmit={onSubmit}>
                <div className="form-row">
                    <label>Имя: </label>
                    <input required={true} {...register("first_name")}/>
                </div>
                <div className="form-row">
                    <label>Отчество: </label>
                    <input {...register("patronym")}/>
                </div>
                <div className="form-row">
                    <label>Фамилия: </label>
                    <input {...register("last_name")}/>
                </div>
                <div className="form-row">
                    <label>Кратко: </label>
                    <input {...register("alias")}/>
                </div>
                <button type={"submit"}>Добавить</button>
            </form>
        </Modal>
    );
}

export default AddPersonModal;