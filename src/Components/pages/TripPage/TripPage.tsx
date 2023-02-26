import React, {useEffect, useState} from "react";

import Loading from "../../Fragments/Loading";
import {get, post} from "../../../Server/Requests";
import {useNavigate} from "react-router-dom";
import {Person, Trip, getName, City, getTripDate, Country} from "../../../Types";
import Participant from "./Participant";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";

import TripPoints from "./TripPoints";



function TripPage({trip, people, cities, countries}:
                      {trip:Trip, people:Person[], cities: City[], countries : Country[]}) {
    if(!trip) return <Loading object='trips'/>
    const navigate = useNavigate();
    const [participants, setParts] = useState<Person[]>([])
    const [addingPeople, settingPeople] = useState<boolean>(false);


    function confirmDeletion() {
        if (confirm("Вы собираетесь удалить все данные, связанные с " + trip.title + ". Продолжить?")) {
            post("trips/delete/", trip.trip_id.toString(), true)
                .then(() => navigate("/trips/"));

        }
    }
    useEffect(() => {
        get('trip/' + trip.trip_id + '/participants/').then(
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
                post('trip/' + trip.trip_id.toString() + '/participants/add/',
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


        return (
            <div>
                <TitleSubtitle title={trip.title} subtitle={getTripDate(trip)}/>
                <div className="side-margins">
                    <div className="row right">
                        <button>Edit</button>
                        <button onClick={() => {
                            confirmDeletion()
                        }}>Delete
                        </button>
                    </div>
                    <div className="two-columns">
                        <div className="flow-down">
                            <section>
                                <h2>Участники</h2>
                                {allParticipants}
                                <div className="row right">{(addingPeople) ?
                                    selectTag : <button className="add center-child" onClick={() => {
                                        settingPeople(!addingPeople)
                                    }}>
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </button>
                                }</div>
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
                        <div className="flow-down">
                            <TripPoints trip={trip} cities={cities} countries={countries}/>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }


export default TripPage;