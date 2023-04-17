import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus,faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {City, Country, Trip, TripPoint} from "../../../Helpers/DataTypes";
import SearchInput from "../../Fragments/SearchInput";
import {post} from "../../../Server/Requests";
import {useNavigate} from "react-router-dom";

import Loading from "../Loading";
import Modal from "../../Fragments/Modal";

import useFetch from "../../../Hooks/useFetch";
import useSwitch from "../../../Hooks/useSwitch";


function TripPointsSection({trip,pointsChanged}:{trip:Trip, pointsChanged:()=>void}) {
    const [refetch, flip] = useSwitch()
    const [trippoints] = useFetch<TripPoint[]>("trippoints/for_trip/"+trip.trip_id, refetch);
    const [cities] = useFetch<City[]>("cities/")
    const [countries] = useFetch<Country[]>("countries/")
    const [addingCity, settingCityField] = useState<boolean>(false);
    const [addingPoints, settingPoints] = useState<boolean>(false);
    const [editingOrder, setEditOrder] = useState<boolean>(false);
    const [waitToOrder, setWait] = useState<boolean>(false)
    const titleField = useRef<HTMLInputElement>(null);
    const [selectedCountry, setCountry]=useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const addPointRef = useRef(null)
    let navigate = useNavigate()


    function handleSubmit() {
        if(!titleField.current || !cities || !trippoints) return;

        let seekDupNames = trippoints!.find(point => (titleField.current!.value == point.title));
        if (seekDupNames) {
            alert("Taкая остановка уже добавлена.");
            settingPoints(true)
            return;
        }
        let citySeek = cities.find(city => (city.city == selectedCity));
        if (!citySeek) {
            if(!addingCity){
                settingCityField(true)
                return;
            }
            if(selectedCountry.length==0){
                alert("Страна не введена")
                return;
            }
            post("cities/create/", JSON.stringify({city:selectedCity, country:selectedCountry}), true).then(() => {
                post('trips/'+trip.trip_id+"/trippoints/create/",
                    JSON.stringify({title:titleField.current!.value, city:selectedCity, trip_order:trippoints.length}))
                    .then(()=>{
                        flip()
                        pointsChanged()
                        settingPoints(false)
                    })
            })
            settingCityField(false);
        }else {
            post('trips/'+trip.trip_id+"/trippoints/create/",
                JSON.stringify({title:titleField.current!.value, city:selectedCity, trip_order:trippoints.length}))
                .then(()=>{
                    flip()
                    pointsChanged()
                    settingPoints(false)
                })
        }
    }
    let singlePoint=trippoints&&trippoints.length<=1;
    const allPoints = trippoints?trippoints.map(point =>
        <div className="flex-block full" key={point.trippoint_id}>
            <button className="highlight" onClick={()=>{
                if(!editingOrder)
                    navigate('/trippoints/'+point.trippoint_id)
            }}>
                <h3>{point.title}</h3>
                {(!singlePoint) && <h5>{point.city}</h5>}
                {/*{point.trip_order}*/}
            </button>
            {(editingOrder)&&
            <div className="cover form-row">
                {(point.trip_order>0)?
                    <button className="order big center-child in-list" onClick={()=>{
                        if(!waitToOrder) {
                            setWait(true)
                            post("trippoints/reorder/" + point.trippoint_id.toString(), "-1", true)
                                .then(()=>{
                                    flip()
                                    setWait(false)
                                })
                        }
                    }
                    }><FontAwesomeIcon icon={faAngleLeft} size="2xl"/></button>:
                    <div></div>}
                {(point.trip_order+1!=trippoints!.length)?

                    <button className="order big center-child" onClick={()=>{
                        if(!waitToOrder){
                            setWait(true)
                            post("trippoints/reorder/"+point.trippoint_id.toString(), "1", true)
                                .then(()=>{
                                    flip()
                                    setWait(false)
                                })
                        }
                    }
                    }><FontAwesomeIcon icon={faAngleRight} size='2xl'/></button>:
                    <div></div>}
            </div>}
        </div>
    ):[]

    return (
        <section>
            <h2>Остановки</h2>
            {(!trippoints)&&<Loading object={"остановки"}/>}
            {(allPoints.length>0)&&<div className="flex-grid outline">
                {allPoints}
            </div>}
            <div className="row edges">
                {trippoints&& <Modal header={"Новая остановка"} openRef={addPointRef} offToggle={refetch}>
                    <div className="vert-window">
                        <div className="form-row">
                            <label>Название: </label>
                            <input ref={titleField} required={true}/>
                        </div>
                        <div className="form-row">
                            <label>Город: </label>
                            <SearchInput<City> id="city" array={cities}
                                               stringify={(item) => item.city}
                                               onSetValue={(city) => {
                                                   setSelectedCity(city)
                                               }}
                            />
                        </div>
                        <div className="form-row">
                            <input value={trip.trip_id} hidden={true} readOnly={true}/>
                            <input name="trippoint_id" value={0} hidden={true} readOnly={true}/>
                            <input name="trip_order" value={trippoints.length + 1} readOnly={true}
                                   hidden={true}/>
                        </div>
                        {addingCity &&
                            <div className="form-row">
                                <label>Страна: </label>
                                <SearchInput<Country> id={"country"} array={countries} onlySelect={true}
                                                      stringify={(country) => country.country}
                                                      onSetValue={(value) => {
                                                          console.log("clicked " + value)
                                                          setCountry(value)
                                                      }}/>
                            </div>
                        }
                        <button onClick={handleSubmit}>Добавить</button>
                    </div>
                </Modal>
                }

                <button className="big" ref={addPointRef}
                        onClick={() => settingPoints(!addingPoints)}>
                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                </button>
                {!singlePoint && <div className="ordering outline">
                    <input id="s" hidden={true} type="checkbox" onChange={() => setEditOrder(!editingOrder)} defaultValue={"false"}/>
                    <label htmlFor={"s"} className="sort" >
                        Изменить порядок
                    </label>
                </div>}
            </div>


        </section>
    );
}

export default TripPointsSection;