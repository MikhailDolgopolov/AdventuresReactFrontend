import React from 'react';
import Modal from "../../Fragments/Modal";
import {Souvenir} from "../../../Helpers/DataTypes";
import {SouvenirTitle} from "./SouvenirPage";
import {useNavigate} from "react-router-dom";

function SouvenirModal({s, openRef}:{s:Souvenir, openRef:React.MutableRefObject<any>}) {
    const navigate = useNavigate()
    return (
        <Modal header={SouvenirTitle(s)} openRef={openRef}>
            <div className="vert-window">
                <div className="form-row">
                    <label>Название: </label>
                    <p>{s.name}</p>
                </div>
                <div className="form-row">
                    <label>Материал: </label>
                    <p>{s.material}</p>
                </div>
                <div className="form-row">
                    <label>Тип:  </label>
                    <p>{s.type}</p>
                </div>
                <div className="form-row">
                    <label>Город:  </label>
                    <p>{s.city}</p>
                </div>
                <label>Описание:  </label>
                <p>{s.description}</p>
                <button onClick={()=>navigate("/souvenirs/"+s.souvenir_id)}>Перейти на страницу</button>
            </div>
        </Modal>
    );
}

export default SouvenirModal;