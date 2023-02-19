import React from 'react';
import {postRequest} from "../../../App";
import {getName, Person, Trip} from "../../../Types";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBookmark, faEdit, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import {faXmark} from "@fortawesome/free-solid-svg-icons";

function Participant({person, trip, func}:{person:Person, trip:Trip, func:Function}) {
    function confirmPersonRemoval(person:number){
        if(confirm("Вы собираетесь удалить человека из списка. Продолжить?")){
            postRequest('trip/'+trip.trip_id.toString()+'/participants/delete/', person.toString()).
            then(result=>func(result));
        }
    }
    return (
        <div className="hoverable spread-row outline">
            <p>{getName(person)}</p>
            <div>
                <button className="showable" onClick={()=>confirmPersonRemoval(person.person_id)}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
            </div>
        </div>
    );
}

export default Participant;