import React, {useRef, useState} from "react";

import {post} from "../../../Server/Requests";
import {useNavigate} from "react-router-dom";
import {Person, Trip, getName, getTripDate, TripPoint} from "../../../Helpers/DataTypes";
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




function TripPage({trip, onChange}:{trip:Trip, onChange:()=>void}) {
    const navigate = useNavigate();
    const [refetch, flip] = useSwitch()
    const [people, loadPeople] = useFetch<Person[]>("people/", refetch)
    const [refetchParts, flipRefetchParts] = useSwitch();
    const [participants, loadParts] = useFetch<Person[]>('trips/' + trip.trip_id + '/participants/', refetchParts!=refetch)
    const [refetchTrippoints, flipRefetchPoints] = useSwitch();
    const [trippoints, loadingTrippoints] = useFetch<TripPoint[]>('trippoints/for_trip/' + trip.trip_id, refetchTrippoints!=refetch)
    const [addingPeople, settingPeople] = useState<boolean>(false);

    
    let editRef = useRef<HTMLButtonElement>(null)


    function confirmDeletion() {
        if (window.confirm("Вы собираетесь удалить все данные, связанные с " + trip.title + ". Продолжить?")) {
            post("trips/delete/", trip.trip_id.toString(), true)
                .then(() => navigate(-1));

        }
    }
    if (!participants) return <LoadingError loadingObject="путешествие" loading={loadParts} wholePage={true}/>

    const allParticipants = participants!.map(person =>
        <Participant key={person.person_id} person={person} trip={trip} func={flipRefetchParts}/>);
    let options = people?people.map(person =>
        <option key={person.person_id} value={person.person_id}>
            {getName(person)}</option>):[]


    const selectTag = <div>
        {people&&people.filter(c=>!participants.find(other=>c.person_id==other.person_id))
            .map(p=><button data-selected="0" className="side-margins vert-margins" key={p.person_id} onClick={()=>{
            let seek = participants!.find(person => (person.person_id == p.person_id))
            if (seek) return;
            post('trips/' + trip.trip_id.toString() + '/participants/add/',
                '[' + p.person_id + ']').then(()=>flipRefetchParts());
        }}>{getName(p)}</button>)}
    </div>


    return (
        <>
            <TitleSubtitle title={trip.title+" "+trip.year} subtitle={getTripDate(trip)}/>
            <EditTripModal trip={trip} onChange={()=>{
                onChange()
                flip()
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
                        <TripPointsSection trip={trip} onChange={flipRefetchPoints}/>
                    </div>
                    <div className="flow-down">
                        {trippoints&&trippoints.length>0&&<SightsSection trip={trip} points={trippoints}/>}
                        {trippoints&&trippoints.length>0&&<SouvenirsSection trip={trip} points={trippoints}/>}
                    </div>
                </div>
            </div>
        </>
    );
}


export default TripPage;