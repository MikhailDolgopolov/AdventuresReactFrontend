import React, {useEffect, useRef, useState} from "react";

import Loading from "../../Fragments/Loading";
import {get, post} from "../../../Server/Requests";
import {redirect, useNavigate} from "react-router-dom";
import {Person, Trip, getName, City, getTripDate, Country} from "../../../Helpers/Types";
import Participant from "./Participant";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faXmark,} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";

import TripPoints from "./TripPoints";
import Modal from "../../Modal";
import editEntry from "../../Fragments/EditEntry";
import EditTripModal from "./EditTripModal";




function TripPage({trip_id, people, cities, countries}:
                      {trip_id:number, people:Person[], cities: City[], countries : Country[]}) {
    const navigate = useNavigate();
    const [trip, setTrip] = useState<Trip>({trip_id:0, title:"", start_date:"", end_date:"", description:"", photo_link:""});
    const [participants, setParts] = useState<Person[]>([])
    const [addingPeople, settingPeople] = useState<boolean>(false);


    function confirmDeletion() {
        if (confirm("Вы собираетесь удалить все данные, связанные с " + trip.title + ". Продолжить?")) {
            post("trips/delete/", trip.trip_id.toString(), true)
                .then(() => navigate("/trips/"));

        }
    }
    useEffect(() => {
        get('trips/'+trip_id+"/").then(result=>setTrip(result))
        get('trips/' + trip_id + '/participants/').then(
            result => setParts(result))
    }, [])
    if (!participants) return <Loading object="participants"/>
    const allParticipants = participants.map(person =>
        <Participant key={person.person_id} person={person} trip={trip} func={setParts}/>);
    let options = people.map(person =>
        <option key={person.person_id} value={person.person_id}>
            {getName(person)}</option>)


    const selectTag = <div>
            <span onClick={() => {
                settingPeople(!addingPeople)
            }}>Добавить   </span>
        <select id="person_select" onChange={(event) => {
            let id = parseInt(event.target.value);

            let seek = participants.find(person => (person.person_id == id))
            if (seek) return;
            post('trips/' + trip.trip_id.toString() + '/participants/add/',
                '[' + event.target.value + ']').then(result => setParts(result));
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
    let editRef = useRef<HTMLButtonElement>(null)


    return (
        <>
            <TitleSubtitle title={trip.title} subtitle={getTripDate(trip)}/>
            <EditTripModal trip={trip} setTrip={res=>{
                setTrip(res)
            }} editRef={editRef}/>
            <div className="side-margins">
                <EditEntry onDelete={() => confirmDeletion()} onEdit={()=>{}} editRef={editRef}/>
                <div className="two-columns uneven">
                    <div className="flow-down">
                        <section>
                            <h2>Участники</h2>
                            {allParticipants}
                            {(addingPeople) ?
                                selectTag : <button className="center-child big" onClick={() => {
                                    settingPeople(!addingPeople)
                                }}>
                                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                                </button>
                            }
                        </section>
                        <TripPoints trip={trip} cities={cities} countries={countries}/>
                    </div>
                    <div className="flow-down">
                        <section>
                            <h2>Достопримечательности</h2>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dignissimos
                                dolorem
                                explicabo mollitia perspiciatis rem veniam vitae? Asperiores aspernatur deserunt
                                doloremque
                                molestias nostrum, optio provident quae quisquam, quo veritatis voluptates.
                            </div>
                        </section>
                        <section>
                            <h2>Сувениры</h2>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dignissimos
                                dolorem
                                explicabo mollitia perspiciatis rem veniam vitae? Asperiores aspernatur deserunt
                                doloremque
                                molestias nostrum, optio provident quae quisquam, quo veritatis voluptates.
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}


export default TripPage;