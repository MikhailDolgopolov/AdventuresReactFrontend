import React, {useEffect, useRef, useState} from "react";

import Loading from "../Loading";
import {post} from "../../../Server/Requests";
import {useNavigate} from "react-router-dom";
import {Person, Trip, getName, getTripDate, TripPoint} from "../../../Helpers/DataTypes";
import {MyData} from "../../../Helpers/HelperTypes"
import Participant from "./Participant";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, } from "@fortawesome/free-solid-svg-icons";

import TripPointsSection from "./TripPointsSection";
import EditTripModal from "./EditTripModal";
import useFetch from "../../../Hooks/useFetch";
import LoadingError from "../LoadingError";
import SouvenirsSection from "./Souvenirs/SouvenirsSection";
import SightsSection from "./Sights/SightsSection";
import useSwitch from "../../../Hooks/useSwitch";




function TripPage({data, trip}:{data:MyData, trip:Trip}) {
    const navigate = useNavigate();
    const [refetchParts, flipRefetchParts] = useSwitch();
    const [participants, loadParts] = useFetch<Person[]>('trips/' + trip.trip_id + '/participants/', refetchParts)
    const [refetchTrippoints, flipRefetchPoints] = useSwitch();
    const [trippoints, loadingTrippoints] = useFetch<TripPoint[]>('trips/' + trip.trip_id + '/trippoints/', refetchTrippoints)
    const [addingPeople, settingPeople] = useState<boolean>(false);

    
    let editRef = useRef<HTMLButtonElement>(null)


    function confirmDeletion() {
        if (confirm("Вы собираетесь удалить все данные, связанные с " + trip.title + ". Продолжить?")) {
            post("trips/delete/", trip.trip_id.toString(), true)
                .then(() => navigate("/trips/"));

        }
    }
    if (!participants) return <LoadingError loadingObject="путешествие" loading={loadParts} wholePage={true}/>
    if(!trippoints || !data.trippoints) return <LoadingError loadingObject={"trip points"} loading={loadingTrippoints || data.loading}/>
    const allParticipants = participants!.map(person =>
        <Participant key={person.person_id} person={person} trip={trip} func={flipRefetchParts}/>);
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
                '[' + event.target.value + ']').then(()=>flipRefetchParts());
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
                        <TripPointsSection trip={trip} data={data} trippoints={trippoints} refetchTrippoints={refetchTrippoints} setRefetch={flipRefetchParts}/>
                    </div>
                    <div className="flow-down">
                        <SightsSection trip={trip} points={trippoints} data={data}/>
                        <SouvenirsSection trip={trip} points={trippoints}/>
                    </div>
                </div>
            </div>
        </>
    );
}


export default TripPage;