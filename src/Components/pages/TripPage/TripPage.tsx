import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {Multiselect} from "multiselect-react-dropdown";
import BackToTrips from "../../Fragments/BackToTrips";
import Loading from "../../Fragments/Loading";
import {getRequest, MyContext, postRequest} from "../../../App";
import {useNavigate} from "react-router-dom";
import {Person, Trip, getName, SharedData, MultiselectOption} from "../../../Types";
import Participant from "./Participant";
import TitleSubtitle from "../../Fragments/TitleSubtitle";

function TripPage({trip, people}:{trip:Trip, people:Person[]}) {
    if(!trip) return <Loading object='trips'/>
    const navigate = useNavigate();
    const [participants, setParts] = useState<Person[]>([])
    const [addingPeople, setAdd] = useState<boolean>(false);
    function confirmDeletion(){
        if(confirm("Вы собираетесь удалить все данные, связанные с "+trip.title+". Продолжить?")){
            postRequest("trips/delete/", trip.trip_id.toString())
                .then(()=>navigate("/trips/"));

        }
    }
    useEffect(()=>{
        getRequest('trip/'+trip.trip_id+'/participants/').then(
            result=>setParts(result))
    }, [])
    if(!participants) return <Loading object="participants"/>
    const allParticipants = participants.map(person=>
        <Participant key={person.person_id} person={person} trip={trip} func={setParts}/>);
    let options=people.map(person=>
        <option key={person.person_id} value={person.person_id}>
            {getName(person)}</option> )


    const selectTag=<div>
        <span onClick={()=>{setAdd(!addingPeople)}}>Добавить   </span>
        <select id="person_select" onChange={(event)=>{
            let id = parseInt(event.target.value);
            setAdd(false);
            let seek = participants.find(person=>(person.person_id==id))
            if(seek) return;
            postRequest('trip/'+trip.trip_id.toString()+'/participants/add/',
                '['+event.target.value+']').then(result=>setParts(result));
        }}>
            <option>---</option>
            {options}
        </select>
    </div>
    return (
        <div>
            <TitleSubtitle title={trip.title} subtitle={trip.start_date+' - '+trip.end_date}/>
            <section className="side-margins spread-column">
                <div className="spread-row">
                    <BackToTrips/>
                    <button onClick={()=>{confirmDeletion()}}>Delete</button>
                </div>
                <section className="small-window">
                    <h2>Участники</h2>
                    {allParticipants}
                    {(addingPeople)?selectTag:<button onClick={()=>{setAdd(!addingPeople)}}>Add</button>}

                </section>
                {trip.description !== null && <p>{trip.description}</p>}

            </section>
        </div>
    );
}

export default TripPage;