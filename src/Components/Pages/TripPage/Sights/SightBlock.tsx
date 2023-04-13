import React, {useRef} from 'react';
import {Sight} from "../../../../Helpers/DataTypes";
import Modal from "../../../Fragments/Modal";
import {post} from "../../../../Server/Requests";
import useSwitch from "../../../../Hooks/useSwitch";

function SightBlock({s}:{s:Sight}) {
    const editSightRef = useRef(null)
    const [closeModal, flip] = useSwitch()
    function deleteSight() {
        if(confirm("Вы собираетесь удалить "+s.name+". Продолжить?"))
            console.log("deleting")
            post("sights/delete/", JSON.stringify(s)).then(()=>flip())
    }
    return (
        <>
            <button className="flex-block highlight" key={s.sight_id} ref={editSightRef}>
                <p>{s.name}</p>
            </button>
            <Modal header="Изменить данные" openRef={editSightRef} offToggle={closeModal}>
                <form className="vert-window">
                    <div className="form-row">
                        <label>Название: </label>
                        <input defaultValue={s.name}/>
                    </div>
                    <div className="form-row">
                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={deleteSight}>Удалить</button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default SightBlock;