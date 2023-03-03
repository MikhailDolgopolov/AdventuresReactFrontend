import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {City, Country, Trip, TripPoint} from "../../../Types";
import SearchInput from "../../Fragments/SearchInput";
import {get} from "../../../Server/Requests";
import useLogger from "../../../useLogger";

function TripPoints({trip, cities, countries}:{trip:Trip, cities:City[], countries:Country[]}) {
    const [tripPoints, setPoints] = useState<TripPoint[]>([])
    const [addingCity, settingCityField] = useState<boolean>(false);
    const [addingPoints, settingPoints] = useState<boolean>(false);
    const TitleField = useRef<HTMLInputElement>(null);
    const [selectedCountry, setCountry]=useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");


    useEffect(() => {
        get('trip/' + trip.trip_id + '/trip-points/').then(
            result => setPoints(result))
    }, [addingPoints]);

    function handleSubmit() {
        if(!TitleField.current) return;
        let seek = tripPoints.find(point => (TitleField.current!.value == point.title));
        let citySeek = cities.find(city => (city.city == selectedCity));
        console.log("submit")
        if (!citySeek) {
            if (!selectedCountry) {
                settingCityField(true);
                return;
            }
            // post("cities/create/", JSONify({city:data.city, country:selectedCountry}), true).then(() => {
            //     post('trip/' + trip.trip_id + "/trip-points/create/", JSONify(data), true).then(() => {
            //         settingPoints(false);
            //     });
            // })
            settingCityField(false);
            settingPoints(false);
        }
        if (seek) {
            alert("Taкая остановка уже добавлена.");
            settingPoints(true)
        }
    }
    let singlePoint=tripPoints.length<=1;
    const allPoints = tripPoints.map(point =>
        <div className="grid-block" key={point.trip_point_id}>
            <button className="grid-button">
                <h3>{point.title}</h3>
                {(!singlePoint) && <h5>{point.city}</h5>}
            </button>
        </div>)
    return (
        <section>
            <h2>Остановки</h2>
            <div className="grid in-section">
                {allPoints}
                {(addingPoints)
                    ? <div className="vert-window">
                        <div className="window-header">
                            <button onClick={() => settingPoints(!addingPoints)}>
                                <FontAwesomeIcon icon={faXmark}/>
                            </button>
                            <h3>Новая остановка</h3>
                        </div>
                        <div className="form-row">
                            <label>Название: </label>
                            <input ref={TitleField} required={true}/>
                        </div>
                        <div className="form-row">
                            <label>Город: </label>
                            <SearchInput<City> id="city" array={cities}
                                                              stringify={(item) => item.city}
                                                              onSetValue={(city) => {setSelectedCity(city)}}
                                                              />
                        </div>
                        <div className="form-row">
                            <input value={trip.trip_id} hidden={true} readOnly={true}/>
                            <input name="trip_point_id" value={0} hidden={true} readOnly={true}/>
                            <input name="trip_order" value={tripPoints.length + 1} readOnly={true}
                                   hidden={true}/>
                        </div>
                        {addingCity &&
                            <div className="form-row">
                                <label>Страна: </label>
                                <SearchInput<Country> id={"country"} array={countries} onlySelect={true}
                                                                 stringify={(country) => country.country}
                                                                 onSetValue={(value) => setCountry(value)}/>
                            </div>
                        }

                        <button onClick={handleSubmit}>Добавить</button>
                    </div> :
                    <button className="grid-block center-child"
                            onClick={() => settingPoints(!addingPoints)}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>}
            </div>
        </section>
    );
}

export default TripPoints;