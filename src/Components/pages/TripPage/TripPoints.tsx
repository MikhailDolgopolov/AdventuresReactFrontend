import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faXmark, faSort, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {City, Country, Trip, TripPoint} from "../../../Helpers/Types";
import SearchInput from "../../Fragments/SearchInput";
import {get, post} from "../../../Server/Requests";
import useLogger from "../../../Hooks/useLogger";
import {useNavigate} from "react-router-dom";

function TripPoints({trip, cities, countries}:{trip:Trip, cities:City[], countries:Country[]}) {
    const [tripPoints, setPoints] = useState<TripPoint[]>([])
    const [addingCity, settingCityField] = useState<boolean>(false);
    const [addingPoints, settingPoints] = useState<boolean>(false);
    const [editingOrder, setEditOrder] = useState<boolean>(false);
    const [waitToOrder, setWait] = useState<boolean>(false)
    const titleField = useRef<HTMLInputElement>(null);
    const [selectedCountry, setCountry]=useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    let navigate = useNavigate()
    function fetchPoints() {
        get('trips/' + trip.trip_id + '/trippoints/').then(
            result => {
                setWait(false)
                if(result.length>0)
                    setPoints(result)
            })
    }
    useEffect(()=>fetchPoints(),[])
    useEffect(() => {
       fetchPoints()
    }, [trip,editingOrder, addingPoints]);

    function handleSubmit() {
        if(!titleField.current) return;
        let seekDupNames = tripPoints.find(point => (titleField.current!.value == point.title));
        let citySeek = cities.find(city => (city.city == selectedCity));
        if (!citySeek) {
            if (!selectedCountry) {
                settingCityField(true);
                return;
            }
            console.log(JSON.stringify({city:selectedCity, country:selectedCountry}))
            post("cities/create/", JSON.stringify({city:selectedCity, country:selectedCountry}), true).then(() => {
                if (seekDupNames) {
                    alert("Taкая остановка уже добавлена.");
                    settingPoints(true)

                }
            })
            settingCityField(false);
            settingPoints(false);
        }

        post('trips/'+trip.trip_id+"/trippoints/create/",
            JSON.stringify({title:titleField.current.value, city:selectedCity, trip_order:tripPoints.length}))
            .then(result=>{
                setPoints(result)
                settingPoints(false)
            })
    }
    let singlePoint=tripPoints.length<=1;
    const allPoints = tripPoints.map(point =>
        <div className="flex-block full" key={point.trip_point_id}>
            <button  onClick={()=>{
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
                    <button className="order big center-child" onClick={()=>{
                        if(!waitToOrder) {
                            setWait(true)
                            post("trippoints/reorder/" + point.trip_point_id.toString(), "-1", true)
                                .then(fetchPoints)
                        }
                    }
                    }><FontAwesomeIcon icon={faAngleLeft} size="2xl"/></button>:
                    <div></div>}
                {(point.trip_order+1<tripPoints.length)?
                    <button className="order big center-child" onClick={()=>{
                        if(!waitToOrder){
                            setWait(true)
                            post("trippoints/reorder/"+point.trip_point_id.toString(), "1", true)
                                .then(fetchPoints)
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
             <div>
                <div className="row edges">
                    {(addingPoints)
                        ? <div className="vert-window outline">
                            <div className="window-header">
                                <button onClick={() => settingPoints(!addingPoints)}>
                                    <FontAwesomeIcon icon={faXmark}/>
                                </button>
                                <h3>Новая остановка</h3>
                            </div>
                            <div className="form-row">
                                <label>Название: </label>
                                <input ref={titleField} required={true}/>
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
                                                          onSetValue={(value) => {
                                                              console.log("clicked "+value)
                                                              setCountry(value)
                                                          }}/>
                                </div>
                            }
                            <button onClick={handleSubmit}>Добавить</button>
                        </div>
                        :
                        <button className="big"
                                onClick={() => settingPoints(!addingPoints)}>
                            <FontAwesomeIcon icon={faPlus} size="2x"/>
                        </button>
                    }
                    {!singlePoint && <div className="ordering outline">
                        <input id="s" hidden={true} type="checkbox" onChange={(val) => setEditOrder(!editingOrder)} defaultValue={"false"}/>
                        <label htmlFor={"s"} className="sort" >
                            Изменить порядок
                        </label>
                    </div>}
                </div>

            </div>

        </section>
    );
}

export default TripPoints;