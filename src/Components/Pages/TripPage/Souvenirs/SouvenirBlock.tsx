import React, {useRef, useState} from 'react';
import {Souvenir} from "../../../../Helpers/DataTypes";
import Modal from "../../../Fragments/Modal";
import {post} from "../../../../Server/Requests";
import useSwitch from "../../../../Hooks/useSwitch";

function SouvenirBlock({s}:{s:Souvenir}) {
    const editSouvenirRef = useRef(null)
    const [closeModal, flip] = useSwitch()
    function deleteSouvenir() {
        if(confirm("Вы собираетесь удалить "+s.name+". Продолжить?"))

            post("souvenirs/delete/", JSON.stringify(s)).then(()=>flip())
    }
    return (
        <>
            <button className="flex-block highlight" key={s.souvenir_id} ref={editSouvenirRef}>
                <p>{s.name}</p>
            </button>
            <Modal header="Изменить данные" openRef={editSouvenirRef} offToggle={closeModal}>
                <form className="vert-window">
                    <div className="form-row">
                        <label>Название: </label>
                        <input defaultValue={s.name}/>
                    </div>
                    <div className="form-row">
                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={deleteSouvenir}>Удалить</button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default SouvenirBlock;