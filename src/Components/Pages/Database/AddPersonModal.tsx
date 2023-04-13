import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Person} from "../../../Helpers/DataTypes";
import Modal from "../../Fragments/Modal";

function AddPersonModal({addPersonButton, onAdd}:{onAdd:{():void}
    addPersonButton:React.MutableRefObject<HTMLElement|null>}) {
    const [toggleModal, setToggle] = useState<boolean>(true);
    const {register, handleSubmit} = useForm<Person>();
    const onSubmit = handleSubmit((data, e?: React.BaseSyntheticEvent)=>{
        e!.preventDefault()
    })
    return (
        <Modal header="Добавить человека" openRef={addPersonButton} offToggle={toggleModal}>
            <form className="vert-window" onSubmit={onSubmit}>
            </form>
        </Modal>
    );
}

export default AddPersonModal;