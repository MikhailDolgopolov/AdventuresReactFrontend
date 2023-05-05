import React, {useRef} from 'react';
import {City, Sight} from "../../../Helpers/DataTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import {post} from "../../../Server/Requests";
import {SouvenirTitle} from "../Souvenirs/SouvenirPage";
import {useNavigate} from "react-router-dom";
import EditEntry from "../../Fragments/EditEntry";
import EditSightModal from "./EditSightModal";
import cities from "../Cities/Cities";

function SightPage({s, onChange, cities, types}:{s:Sight, onChange:()=>void, cities?:City[], types?:string[]}) {
    const navigate=useNavigate()
    const editRef = useRef<HTMLButtonElement>(null)

    function deleteSight(){
        if(window.confirm("Вы собираетесь удалить "+s.name+". Продолжить?")){
            post("sights/delete/", JSON.stringify(s)).then(()=>{
                onChange();
                navigate(-1)
            })
        }
    }

    return (
        <>
            <TitleSubtitle title={s.name} subtitle={s.city}/>
            <EditSightModal s={s} openRef={editRef} onChange={onChange} cities={cities} types={types}/>
            <div className="side-margins">
                <EditEntry onEdit={() => {}} onDelete={deleteSight} editRef={editRef}/>
            </div>
        </>
    );
}

export default SightPage;