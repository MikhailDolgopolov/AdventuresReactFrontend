import React, {useEffect, useRef} from 'react';
import {Person, Trip} from "../../../Helpers/DataTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";
import Modal from "../../Fragments/Modal";
import {useForm} from "react-hook-form";
import {post} from "../../../Server/Requests";
import EditPersonModal from "./EditPersonModal";
import {useNavigate} from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import TripBlock from "../GroupedTrips/TripBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import useSwitch from "../../../Hooks/useSwitch";
import AddTripModal from "../GroupedTrips/AddTripModal";

function PersonPage({person, onChange}:{person:Person, onChange:()=>void}) {
    const navigate=useNavigate()
    let editRef = useRef<HTMLButtonElement>(null)
    let addTripButton = useRef<HTMLButtonElement>(null)
    const [refetch, flip] = useSwitch()
    const [existingTrips, hideTrips] = useSwitch()
    let [otherTrips] = useFetch<Trip[]>("trips/not_mine/"+person.person_id, refetch)
    const [trips] = useFetch<Trip[]>("trips/for_person/"+person.person_id, refetch);

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
            <AddTripModal onAdd={(trip)=>{
                post('trips/' + trip.trip_id.toString() + '/participants/add/',
                    "["+person.person_id+"]").then(()=>{flip();onChange()})
            }} openRef={addTripButton}/>
            <div className="side-margins">
                <EditEntry onEdit={() => {}} onDelete={deletePerson} editRef={editRef}/>
                <div className="two-columns">
                    <div className="flow-down">
                        <section>
                            <h2>Путешествия</h2>
                            {trips&&<div className="flex-grid outline">
                                {trips.length>0?trips.map(t=>
                                    <TripBlock trip={t} key={t.trip_id}/>):<p className="note">Пусто...</p>}
                            </div>}
                            <div className="row">
                                <button ref={addTripButton} className="big center-child square">
                                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                                </button>
                                <button onClick={hideTrips}>Добавить уществующие путешествия</button>
                            </div>
                            {otherTrips&&otherTrips.length>0&&existingTrips&&<div className="flex-grid">
                                {otherTrips.map(t=>
                                    <button data-selected="0" key={t.trip_id} onClick={()=>{
                                        post('trips/' + t.trip_id.toString() + '/participants/add/',
                                            "["+person.person_id+"]").then(()=>{flip();onChange()});
                                    }
                                    }>{t.title} {t.year}</button>)}
                            </div>}
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PersonPage;