import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faXmark, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {City, Country, Trip, TripPoint} from "../../../Helpers/DataTypes";
import SearchInput from "../../Fragments/SearchInput";
import {post} from "../../../././Server/Requests";
import useLogger from "../../../Hooks/useLogger";
import {useNavigate} from "react-router-dom";
import LoadingError from "../LoadingError";
import Loading from "../Loading";
import Modal from "../../Fragments/Modal";
import useFetch from "../../../Hooks/useFetch";
import {MyData} from "../../../Helpers/HelperTypes";

function TripPoints({trip, data}:{trip:Trip, data:MyData}) {
    const [trippoints, loadingTrippoints, errorLoadingTrippoints, refetchPoints] = useFetch<TripPoint[]>('trips/' + trip.trip_id + '/trippoints/')
    const [addingCity, settingCityField] = useState<boolean>(false);
    const [addingPoints, settingPoints] = useState<boolean>(false);
    const [editingOrder, setEditOrder] = useState<boolean>(false);
    const [waitToOrder, setWait] = useState<boolean>(false)
    const titleField = useRef<HTMLInputElement>(null);
    const [selectedCountry, setCountry]=useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const addPointRef = useRef(null)
    let navigate = useNavigate()

    if(!trippoints || !data.trippoints) return <LoadingError loadingObject={"trip points"} loading={loadingTrippoints || data.loading}/>


    function handleSubmit() {
        if(!titleField.current) return;

        let seekDupNames = data.trippoints!.find(point => (titleField.current!.value == point.title));
        if (seekDupNames) {
            alert("Taкая остановка уже добавлена.");
            settingPoints(true)
            return;
        }
        let citySeek = data.cities!.find(city => (city.city == selectedCity));
        if (!citySeek) {
            if(!addingCity){
                settingCityField(true)
                return;
            }
            if(selectedCountry.length==0){
                alert("Страна не введена")
                return;
            }
            console.log(JSON.stringify({city:selectedCity, country:selectedCountry}))
            post("cities/create/", JSON.stringify({city:selectedCity, country:selectedCountry}), true).then(() => {
                post('trips/'+trip.trip_id+"/trippoints/create/",
                    JSON.stringify({title:titleField.current!.value, city:selectedCity, trip_order:data.trippoints!.length}))
                    .then(result=>{
                        data.functions.points()
                        settingPoints(false)
                    })
            })
            settingCityField(false);
        }else {
            post('trips/'+trip.trip_id+"/trippoints/create/",
                JSON.stringify({title:titleField.current!.value, city:selectedCity, trip_order:data.trippoints!.length}))
                .then(result=>{
                    data.functions.points()
                    settingPoints(false)
                })
        }

    }
    let singlePoint=trippoints&&trippoints.length<=1;
    const allPoints = trippoints!.map(point =>
        <div className="flex-block full" key={point.trip_point_id}>
            <button className="highlight" onClick={()=>{
                if(!editingOrder)
                    navigate('/trippoints/'+point.trip_point_id)
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
                            post("trippoints/reorder/" + point.trip_point_id.toString(), "-1", true)
                                .then(()=>refetchPoints())
                        }
                    }
                    }><FontAwesomeIcon icon={faAngleLeft} size="2xl"/></button>:
                    <div></div>}
                {(point.trip_order+1<data.trippoints!.length)?
                    <button className="order big center-child" onClick={()=>{
                        if(!waitToOrder){
                            setWait(true)
                            post("trippoints/reorder/"+point.trip_point_id.toString(), "1", true)
                                .then(()=>refetchPoints())
                        }
                    }
                    }><FontAwesomeIcon icon={faAngleRight} size='2xl'/></button>:
                    <div></div>}
            </div>}
        </div>
    )
    return (
        <section>
            <h2>Остановки</h2>
            {(allPoints.length>0)&&<div className="flex-grid outline">
                {allPoints}
            </div>}
            <div className="row edges">
                <Modal header={"Новая остановка"} openRef={addPointRef}>
                        <div className="vert-window">
                            <div className="form-row">
                                <label>Название: </label>
                                <input ref={titleField} required={true}/>
                            </div>
                            <div className="form-row">
                                <label>Город: </label>
                                <SearchInput<City> id="city" array={data.cities!}
                                                   stringify={(item) => item.city}
                                                   onSetValue={(city) => {
                                                       setSelectedCity(city)
                                                   }}
                                />
                            </div>
                            <div className="form-row">
                                <input value={trip.trip_id} hidden={true} readOnly={true}/>
                                <input name="trip_point_id" value={0} hidden={true} readOnly={true}/>
                                <input name="trip_order" value={data.trippoints.length + 1} readOnly={true}
                                       hidden={true}/>
                            </div>
                            {addingCity &&
                                <div className="form-row">
                                    <label>Страна: </label>
                                    <SearchInput<Country> id={"country"} array={data.countries!} onlySelect={true}
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

                    <button className="big" ref={addPointRef}
                            onClick={() => settingPoints(!addingPoints)}>
                        <FontAwesomeIcon icon={faPlus} size="2x"/>
                    </button>
                {!singlePoint && <div className="ordering outline">
                    <input id="s" hidden={true} type="checkbox" onChange={(val) => setEditOrder(!editingOrder)} defaultValue={"false"}/>
                    <label htmlFor={"s"} className="sort" >
                        Изменить порядок
                    </label>
                </div>}
            </div>


        </section>
    );
}

export default TripPoints;