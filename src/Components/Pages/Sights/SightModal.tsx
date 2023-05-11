import React from 'react';
import {Sight} from "../../../Helpers/DataTypes";
import {useNavigate} from "react-router-dom";
import Modal from "../../Fragments/Modal";
import {SouvenirTitle} from "../Souvenirs/SouvenirPage";
import useSwitch from "../../../Hooks/useSwitch";

function SightModal({s, openRef}:{s:Sight, openRef:React.MutableRefObject<any>}) {
    const navigate = useNavigate()
    const [closeSwitch, flip] = useSwitch()
    return (
        <Modal header={s.name} openRef={openRef} offToggle={closeSwitch}>
            <div className="vert-window">
                <div className="form-row">
                    <label>Название: </label>
                    <p>{s.name}</p>
                </div>
                <div className="form-row">
                    <label>Год: </label>
                    <p>{s.created_year}</p>
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
                <button onClick={()=>{flip();navigate("/sights/"+s.sight_id)}}>Перейти на страницу</button>
            </div>
        </Modal>
    );
}

export default SightModal;