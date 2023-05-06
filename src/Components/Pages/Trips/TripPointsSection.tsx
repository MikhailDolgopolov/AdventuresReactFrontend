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
import {useForm} from "react-hook-form";


function TripPointsSection({trip,onChange}:{trip:Trip, onChange:()=>void}) {
    const [refetch, flip] = useSwitch()
    const [trippoints] = useFetch<TripPoint[]>("trippoints/for_trip/"+trip.trip_id, refetch);
    const [cities] = useFetch<City[]>("cities/")
    const [countries] = useFetch<Country[]>("countries/")
    const [addingCity, settingCityField] = useState<boolean>(false);
    const [addingPoints, settingPoints] = useState<boolean>(false);
    const [editingOrder, setEditOrder] = useState<boolean>(false);
    const [waitToOrder, setWait] = useState<boolean>(false)
    const [selectedCountry, setCountry]=useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const {register, handleSubmit} = useForm<TripPoint>()
    const addPointRef = useRef(null)
    let navigate = useNavigate()


    const onSubmit=handleSubmit((data:TripPoint, e?:React.BaseSyntheticEvent)=> {
        if(!cities || !trippoints) return;
        
        let seekDupNames = trippoints!.find(point => (data.title == point.title));
        if (seekDupNames) {
            alert("Taкая остановка уже добавлена.");
            settingPoints(true)
            return;
        }
        let citySeek = cities.find(city => (city.city == selectedCity));
        data.trip_order=trippoints.length+1
        console.log(data.trip_order)
        if (!citySeek && selectedCity.length>0) {
            if(!addingCity){
                settingCityField(true)
                return;
            }
            if(selectedCountry.length==0){
                alert("Страна не введена")
                return;
            }
            data.city=selectedCity;
            post("cities/create/", JSON.stringify({city:selectedCity, country:selectedCountry}), true).then(() => {
                post("trippoints/create/", JSON.stringify(data))
                    .then(()=>{
                        flip()
                        onChange()
                        settingPoints(false)
                    })
            })
            settingCityField(false);
        }
        else {
            post("trippoints/create/", JSON.stringify(data))
                .then(()=>{
                    flip()
                    onChange()
                    settingPoints(false)
                })
        }
    })
    let singlePoint=trippoints&&trippoints.length<=1;
    const allPoints = trippoints?trippoints.map(point =>
        <div className="flex-block full" key={point.trippoint_id}>
            <button className="highlight" onClick={()=>{
                if(!editingOrder)
                    navigate('/trippoints/'+point.trippoint_id)
            }}>
                <h3>{point.title}</h3>
                {(!singlePoint && point.city) && <h5>{point.city}</h5>}
                {point.trip_order}
            </button>
            {(editingOrder)&&
            <div className="cover form-row even">
                {(point.trip_order>0)?
                    <button className="order big center-child in-list" onClick={()=>{
                        if(!waitToOrder) {
                            setWait(true)
                            post("trippoints/reorder/" + point.trippoint_id.toString(), "-1", true)
                                .then(()=>{
                                    flip()
                                    setWait(false)
                                    setEditOrder(false)
                                })
                        }
                    }
                    }><FontAwesomeIcon icon={faAngleLeft} size="2xl"/></button>:
                    <div></div>}
                {(point.trip_order<trippoints.length-1)?
                    <button className="order big center-child in-list" onClick={()=>{
                        if(!waitToOrder){
                            setWait(true)
                            post("trippoints/reorder/"+point.trippoint_id.toString(), "1", true)
                                .then(()=>{
                                    flip()
                                    setWait(false)
                                    setEditOrder(false)
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
                    <form className="vert-window" onSubmit={onSubmit}>
                        <div className="form-row">
                            <label>Название: </label>
                            <input required={true} {...register("title")} defaultValue={""}/>
                        </div>
                        <div className="form-row">
                            <label>Город: </label>
                            <SearchInput<City> id="city" array={cities} not_required={true}
                                               stringify={(item) => item.city}
                                               onSetValue={(city) => {
                                                   setSelectedCity(city)
                                               }}
                            />
                        </div>
                        <input defaultValue={trip.trip_id} hidden={true} {...register("trip_id")}/>
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
                        <button>Добавить</button>
                    </form>
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