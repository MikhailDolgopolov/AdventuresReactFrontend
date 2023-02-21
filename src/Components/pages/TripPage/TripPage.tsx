import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import BackToTrips from "../../Fragments/BackToTrips";
import Loading from "../../Fragments/Loading";
import {get, getRequest, post, postRequest, useMyQuery} from "../../../App";

import {Person, Trip, getName, SharedData, MultiselectOption} from "../../../Types";
import Participant from "./Participant";
import TitleSubtitle from "../../Fragments/TitleSubtitle";

function TripPage({trip, people}:{trip:Trip, people:Person[]}) {
    if(!trip) return <Loading object='trips'/>
    const navigate = useNavigate();
    let {isError, isLoading, isIdle, data:participants} =
        useQuery<boolean, boolean, Person[]>("parts", ()=>get(trip.trip_id.toString()+'/participants/'))
    const [addingPeople, setAdd] = useState<boolean>(false);
    function confirmDeletion(){
        if(confirm("Вы собираетесь удалить все данные, связанные с "+trip.title+". Продолжить?")){
            postRequest("trips/delete/", trip.trip_id.toString())
                .then(()=>navigate("/trips/"));

        }
    }

    const allParticipants = (isLoading|| isError||isIdle)?<Loading object={'participants'}/>:
        (participants!.map(person=>
        <Participant key={person.person_id} person={person} trip={trip}/>));
    let options=people.map(person=>
        <option key={person.person_id} value={person.person_id}>
            {getName(person)}</option> )

    async function postParts(event:ChangeEvent<HTMLSelectElement>){
        let person = parseInt(event.target.value);
        let {isError:e, isIdle:i, isLoading:l,data:result}= useQuery<Person[]>("addPart",
            () =>post('trip/'+trip.trip_id.toString()+'/participants/add/','['+event.target.value+']'));

        let ready = await new Promise<boolean>(function (resolve, reject){
            resolve(i&&e&&l)
        })
        if(ready) participants=result;
        setAdd(!addingPeople)
    }
    const selectTag=<div>
        <span onClick={()=>{setAdd(!addingPeople)}}>Добавить   </span>
        <select id="person_select" onChange={(event)=>{
            postParts(event).then(()=>{});
        }}>
            <option>---</option>
            {options}
        </select>
    </div>
    return (
        <div>
            <TitleSubtitle title={trip.title} subtitle={trip.start_date+' - '+trip.end_date}/>
            <div className="side-margins spread-column">
                <div className="spread-row">
                    <BackToTrips/>
                    <button onClick={()=>{confirmDeletion()}}>Delete</button>
                </div>
                <div className="small-window">
                    <h2>Участники</h2>
                    {allParticipants}
                    {(addingPeople)?selectTag:<button onClick={()=>{setAdd(!addingPeople)}}>Add</button>}

                </div>
                {trip.description !== null && <p>{trip.description}</p>}

            </div>
        </div>
    );
}

export default TripPage;