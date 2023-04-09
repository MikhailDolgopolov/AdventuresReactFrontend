import React from 'react';
import {post} from "../../../././Server/Requests";
import {getName, Person, Trip} from "../../../Helpers/DataTypes";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

function Participant({person, trip, func}:{person:Person, trip:Trip, func:Function}) {
    let navigate=useNavigate()
    function confirmPersonRemoval(person:number){
        if(confirm("Вы собираетесь удалить человека из списка. Продолжить?")){
            post('trips/'+trip.trip_id.toString()+'/participants/delete/', person.toString()).
            then(result=>func(result));
        }
    }
    return (
        <div className="hoverable row stretch">
            <p>{getName(person)}</p>
            <div className="fill"  onClick={()=>navigate('/people/'+person.person_id)}>
                <div className="line"></div>
            </div>
            <button className="showable center-child" onClick={()=>confirmPersonRemoval(person.person_id)}>
                <FontAwesomeIcon className="showable" icon={faXmark}/>
            </button>
        </div>
    );
}

export default Participant;