import React, {useRef} from 'react';
import {Sight} from "../../../Helpers/DataTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import {post} from "../../../Server/Requests";
import {SouvenirTitle} from "../Souvenirs/SouvenirPage";
import {useNavigate} from "react-router-dom";
import EditEntry from "../../Fragments/EditEntry";
import EditSightModal from "./EditSightModal";

function SightPage({s, onChange}:{s:Sight, onChange:()=>void}) {
    const navigate=useNavigate()
    const editRef = useRef<HTMLButtonElement>(null)
    function deleteSight(){
        if(confirm("Вы собираетесь удалить "+s.name+". Продолжить?")){
            post("sights/delete/", JSON.stringify(s)).then(()=>{
                onChange();
                navigate(-1)
            })
        }
    }
    return (
        <>
            <TitleSubtitle title={s.name} subtitle={s.city}/>
            <EditSightModal s={s} openRef={editRef} onChange={onChange}/>
            <EditEntry onEdit={()=>{}} onDelete={deleteSight} editRef={editRef}/>
        </>
    );
}

export default SightPage;