import React from 'react';
import {Sight} from "../../../Helpers/DataTypes";
import Modal from "../../Fragments/Modal";

function EditSightModal({s, onChange, openRef}:{s:Sight, onChange:()=>void, openRef:React.MutableRefObject<any>}) {
    return (
        <Modal header={"Изменить данные"} openRef={openRef}>
            <form className="vert-window">
                <button type="submit">Сохранить</button>
            </form>
        </Modal>
    );
}

export default EditSightModal;