import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Country} from "../../../Helpers/DataTypes";
import Modal from "../../Fragments/Modal";

function AddCityModal({addCityButton, onAdd}:{onAdd:{():void}
    addCityButton:React.MutableRefObject<HTMLElement|null>}) {
    const [toggleModal, setToggle] = useState<boolean>(true);
    const {register, handleSubmit} = useForm<Country>();
    const onSubmit = handleSubmit((data, e?: React.BaseSyntheticEvent)=>{
        e!.preventDefault()    })
    return (
        <Modal header="Добавить город" openRef={addCityButton} offToggle={toggleModal}>
            <form className="vert-window" onSubmit={onSubmit}>
            </form>
        </Modal>
    );
}

export default AddCityModal;