import React, {useRef} from 'react';
import {Person} from "../../../Helpers/DataTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";
import Modal from "../../Fragments/Modal";
import {useForm} from "react-hook-form";
import {post} from "../../../Server/Requests";
import EditPersonModal from "./EditPersonModal";
import {useNavigate} from "react-router-dom";

function PersonPage({person, onChange}:{person:Person, onChange:()=>void}) {
    const navigate=useNavigate()
    let editRef = useRef<HTMLButtonElement>(null)
    function deletePerson() {
        if(window.confirm("Вы собираетесь полностью удалить "+person.first_name + " "+person.last_name+". Продолжить?")){
            post("people/delete/", JSON.stringify(person.person_id)).then(()=>{
                onChange()
                navigate(-1)
            })
        }
    }
    return (
        <>
            <TitleSubtitle title={person.first_name + " "+person.last_name}/>
            <EditPersonModal person={person} onChange={onChange} openRef={editRef}/>
            <div className="side-margins">
                <EditEntry onEdit={() => {}} onDelete={deletePerson} editRef={editRef}/>
            </div>
        </>
    );
}

export default PersonPage;