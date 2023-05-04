import React from 'react';
import {Person} from "../../../Helpers/DataTypes";
import {useForm} from "react-hook-form";
import {post} from "../../../Server/Requests";
import Modal from "../../Fragments/Modal";
import useSwitch from "../../../Hooks/useSwitch";

function EditPersonModal({person, onChange, openRef}:{person:Person, onChange:()=>void, openRef:React.MutableRefObject<any>}) {
    const [closeModal, flip] = useSwitch()
    const {register, handleSubmit} = useForm<Person>()
    const onSubmit=handleSubmit((data:Person, e?:React.BaseSyntheticEvent)=>{
        e!.preventDefault()
        post("people/update/",JSON.stringify(data)).then(()=>{onChange();flip();})
    })
    return (
        <Modal header={"Изменить данные"} openRef={openRef} offToggle={closeModal}>
            <form className="vert-window" onSubmit={onSubmit}>
                <input hidden={true} defaultValue={person.person_id} {...register("person_id")}/>
                <div className="form-row">
                    <label>Имя: </label>
                    <input required={true} {...register("first_name")} defaultValue={person.first_name}/>
                </div>
                <div className="form-row">
                    <label>Отчество: </label>
                    <input {...register("patronym")} defaultValue={person.patronym}/>
                </div>
                <div className="form-row">
                    <label>Фамилия: </label>
                    <input {...register("last_name")} defaultValue={person.last_name}/>
                </div>
                <div className="form-row">
                    <label>Кратко: </label>
                    <input {...register("alias")} defaultValue={person.alias}/>
                </div>
                <button type={"submit"}>Сохранить</button>
            </form>
        </Modal>
    );
}

export default EditPersonModal;