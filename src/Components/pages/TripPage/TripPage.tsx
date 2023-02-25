import React, {useEffect, useState} from "react";

import Loading from "../../Fragments/Loading";
import {get, post} from "../../../App";
import {useNavigate} from "react-router-dom";
import {Person, Trip, getName, City, getTripDate, TripPoint, Country} from "../../../Types";
import Participant from "./Participant";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import SearchInput from "./../../SearchInput"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";



function TripPage({trip, people, cities, countries}:
                      {trip:Trip, people:Person[], cities: City[], countries : Country[]}) {
    if(!trip) return <Loading object='trips'/>
    const navigate = useNavigate();
    const [participants, setParts] = useState<Person[]>([])
    const [addingPeople, settingPeople] = useState<boolean>(false);
    const [addingPoints, settingPoints] = useState<boolean>(false);
    const [addingCity, settingCityField] = useState<boolean>(false);
    const [selectedCountry, setCountry] = useState<string>();
    const [tripPoints, setPoints] = useState<TripPoint[]>([])
    const {register, handleSubmit} = useForm<TripPoint>();
    const onSubmit = handleSubmit((data)=> {
        let seek = tripPoints.find(point => (data.title == point.title));
        let citySeek = cities.find(city => (city.city == data.city));
        if (!citySeek) {
            if (!selectedCountry) {
                settingCityField(true);
                return;
            }
            post("cities/create/", "{city: " + data.city + ", country: " + selectedCountry + "}", true).then(() => {
                post('trip/' + trip.trip_id + "/trip-points/create/", JSON.stringify(data), true).then(() => {
                    settingPoints(false);
                });
            })
            settingCityField(false);
            settingPoints(false);
        }
        if (seek) {
            alert("Taкая остановка уже добавлена.");
            settingPoints(true)
        }
    })

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
    useEffect(() => {
        get('trip/' + trip.trip_id + '/trip-points/').then(
            result => setPoints(result))
    }, [addingPoints]);

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

        let singlePoint = (tripPoints.length < 2);
        const allPoints = tripPoints.map(point =>
            <div className="grid-block" key={point.trip_point_id}>
                <button className="grid-button">
                    <h3>{point.title}</h3>
                    {(!singlePoint) && <h5>{point.city}</h5>}
                </button>
            </div>)



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
                            <section>
                                <h2>Остановки</h2>
                                <div className="grid in-section">
                                    {allPoints}
                                    {(addingPoints)
                                        ? <form className="vert-window" onSubmit={onSubmit}>
                                            <div className="window-header">
                                                <button onClick={() => settingPoints(!addingPoints)}>
                                                    <FontAwesomeIcon icon={faXmark}/>
                                                </button>
                                                <h3>Новая остановка</h3>
                                            </div>
                                            <div className="form-row">
                                                <label>Название: </label>
                                                <input {...register("title")} required={true}/>
                                            </div>
                                            <div className="form-row">
                                                <label>Город: </label>
                                                <SearchInput<City> id="city" array={cities}
                                                                   stringify={(item) => item.city}
                                                                   onChange={() => {
                                                                   }} register={register("city")}/>
                                            </div>
                                            {addingCity &&
                                                <div className="form-row" id="country-form">
                                                    <label>Страна: </label>
                                                    <SearchInput<Country> id={"country"} array={countries}
                                                                          stringify={(country) => country.country}
                                                                          onChange={(value) => setCountry(value)}/>
                                                </div>
                                            }
                                            <input {...register("trip_id")} value={trip.trip_id} hidden={true}/>
                                            <input {...register("trip_point_id")} value={0} hidden={true}/>
                                            <input {...register("trip_order")} value={tripPoints.length + 1}
                                                   hidden={true}/>
                                            <button type="submit">Добавить</button>
                                        </form> :
                                        <button className="grid-block center-child"
                                                onClick={() => settingPoints(!addingPoints)}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </button>}


                                </div>
                            </section>
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