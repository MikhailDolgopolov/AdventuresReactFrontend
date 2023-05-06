import React, {useRef} from 'react';
import {Sight} from "../../../Helpers/DataTypes";
import OptionalFormRow from "./OptionalFormRow";
import Line from "../../Fragments/Line";
import Modal from "../../Fragments/Modal";
import {useNavigate} from "react-router-dom";
import useSwitch from "../../../Hooks/useSwitch";

function SightBlock({s}:{s:Sight}) {
    const navigate=useNavigate()
    const editSightRef = useRef(null)
    const [closeModal, flip] = useSwitch()
    return (
        <>
            <Modal header={s.name} openRef={editSightRef} offToggle={closeModal}>
                <div className="vert-window">
                    <OptionalFormRow label="Город:  " value={s.city}/>
                    <div className="form-row">
                        <label>Тип:</label>
                        <p>{s.type}</p>
                    </div>
                    <OptionalFormRow label={"Год:  "} number={s.created_year}/>
                    <OptionalFormRow label={"Описание:  "} value={s.description}/>
                    <button type="button" onClick={()=>navigate("/sights/"+s.sight_id)}>Перейти на страницу</button>
                </div>
            </Modal>
        </>
    );
}

export default SightBlock;