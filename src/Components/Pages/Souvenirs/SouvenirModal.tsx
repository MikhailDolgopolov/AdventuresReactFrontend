import React from 'react';
import Modal from "../../Fragments/Modal";
import {Souvenir} from "../../../Helpers/DataTypes";
import {SouvenirTitle} from "./SouvenirPage";
import {useNavigate} from "react-router-dom";
import OptionalFormRow from "../Sights/OptionalFormRow";

function SouvenirModal({s, openRef}:{s:Souvenir, openRef:React.MutableRefObject<any>}) {
    const navigate = useNavigate()
    return (
        <Modal header={SouvenirTitle(s)} openRef={openRef}>
            <div className="vert-window">
                <OptionalFormRow label={"Название:  "} value={s.name}/>
                <OptionalFormRow label={"Материал:  "} value={s.material}/>
                <OptionalFormRow label={"Тип:  "} value={s.type}/>
                <OptionalFormRow label={"Город:  "} value={s.city}/>
                <OptionalFormRow label={"Описание:  "} value={s.description}/>
                <button onClick={()=>navigate("/souvenirs/"+s.souvenir_id)}>Перейти на страницу</button>
            </div>
        </Modal>
    );
}

export default SouvenirModal;