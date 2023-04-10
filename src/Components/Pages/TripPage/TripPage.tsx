import React, {useEffect, useRef, useState} from "react";

import Loading from "../Loading";
import {post} from "../../../Server/Requests";
import {useNavigate} from "react-router-dom";
import {Person, Trip, getName, getTripDate} from "../../../Helpers/DataTypes";
import {MyData} from "../../../Helpers/HelperTypes"
import Participant from "./Participant";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, } from "@fortawesome/free-solid-svg-icons";

import TripPoints from "./TripPoints";
import EditTripModal from "./EditTripModal";
import useFetch from "../../../Hooks/useFetch";
import LoadingError from "../LoadingError";
import SouvenirsSection from "./SouvenirsSection";
import SightsSection from "./SightsSection";




function TripPage({data, trip}:{data:MyData, trip:Trip}) {
    const navigate = useNavigate();
    const [participants, loadParts, errorParts, refetchParts] = useFetch<Person[]>('trips/' + trip.trip_id + '/participants/')

    const [addingPeople, settingPeople] = useState<boolean>(false);

    let editRef = useRef<HTMLButtonElement>(null)


    function confirmDeletion() {
        if (confirm("Вы собираетесь удалить все данные, связанные с " + trip.title + ". Продолжить?")) {
            post("trips/delete/", trip.trip_id.toString(), true)
                .then(() => navigate("/trips/"));

        }
    }
    if (!participants) return <LoadingError loadingObject="participants" loading={loadParts}/>
    const allParticipants = participants!.map(person =>
        <Participant key={person.person_id} person={person} trip={trip} func={refetchParts}/>);
    let options = data.people?data.people.map(person =>
        <option key={person.person_id} value={person.person_id}>
            {getName(person)}</option>):[]


    const selectTag = <div>
            <span onClick={() => {
                settingPeople(!addingPeople)
            }}>Добавить   </span>
        <select id="person_select" onChange={(event) => {
            let id = parseInt(event.target.value);

            let seek = participants!.find(person => (person.person_id == id))
            if (seek) return;
            post('trips/' + trip.trip_id.toString() + '/participants/add/',
                '[' + event.target.value + ']').then(()=>refetchParts());
        }} onSubmit={() => {
            settingPeople(false);
        }
        } onClick={(e) => {
            if (e.button == -1) settingPeople(false);
        }}>
            <option>---</option>
            {options}
        </select>
    </div>


    return (
        <>
            <TitleSubtitle title={trip.title+" "+trip.year} subtitle={getTripDate(trip)}/>
            <EditTripModal trip={trip} setTrip={res=>{
                trip=res;
                data.refetchFunction();
            }} editRef={editRef}/>
            <div className="side-margins">
                <EditEntry onDelete={() => confirmDeletion()} onEdit={()=>{}} editRef={editRef}/>
                <div className="two-columns uneven">
                    <div className="flow-down">
                        <section>
                            <h2>Участники</h2>
                            <div>{allParticipants}</div>
                            <div className="row">
                                <button className="center-child big" onClick={() => {
                                    settingPeople(!addingPeople)
                                }}>
                                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                                </button>
                                {(addingPeople)&& selectTag
                            }</div>
                        </section>
                        <TripPoints trip={trip} data={data}/>
                    </div>
                    <div className="flow-down">
                        <SightsSection trip={trip}/>
                        <SouvenirsSection trip={trip}/>
                    </div>
                </div>
            </div>
        </>
    );
}


export default TripPage;