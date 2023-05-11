import {City, Country, TripPoint} from "../../../Helpers/DataTypes";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {post} from "../../../Server/Requests";
import Modal from "../../Fragments/Modal";
import SearchInput from "../../Fragments/SearchInput";
import useSwitch from "../../../Hooks/useSwitch";
import useFetch from "../../../Hooks/useFetch";

function EditTripPointModal({point, editRef, setPoint, cities}:
           {point:TripPoint, setPoint:{(arg0:TripPoint):void}, editRef:React.MutableRefObject<HTMLElement|null>,
                            cities:City[]}) {
    const {register, handleSubmit} = useForm<TripPoint>();
    const [toggle, setToggle] = useState<boolean>(true)
    const [selectedCity, setCity] = useState<string>(point.city)
    const [selectedCountry, setCountry]=useState<string>("")
    const [showCountryField, setShowField] = useState<boolean>(false)
    const [countries] = useFetch<Country[]>("countries/")
    const onSubmit = handleSubmit((data)=>{
        data.city=selectedCity
        const citySeek=cities.find(c=>c.city==selectedCity);
        if (!selectedCity) {alert("Введите город."); return;}
        if(!citySeek){
            if(!showCountryField){
                setShowField(true)
                return;
            }
            if(selectedCountry.trim().length==0) {alert("Страна не введена."); return;}
            post("cities/create/", JSON.stringify({city:selectedCity, country:selectedCountry})).then(() => {
                post("trippoints/update/", JSON.stringify(data)).then((res)=> {
                    setToggle(!toggle)
                    setPoint(res)
                })
            })
        } else
            post("trippoints/update/", JSON.stringify(data)).then((res)=> {
                setToggle(!toggle)
                setPoint(res)
        })
        setShowField(false)
    })

    return (
        <Modal header="Изменить" openRef={editRef} offToggle={toggle} onClose={()=>{setShowField(false)}}>
            <form className="vert-window" onSubmit={onSubmit}>
                <div className="form-row">
                    <label >Название: </label>
                    <input  required={true} {...register("title")} defaultValue={point.title}/>
                </div>
                <div className="form-row">
                    <label>Город: </label>
                    <SearchInput<City> id="city" array={cities} defaultValue={point.city}
                                       stringify={(item) => item.city}
                                       onSetValue={(city) => {setCity(city)}}
                    />
                </div>
                {showCountryField&&<div className="form-row">
                    <label>Страна: </label>
                    <SearchInput<Country> id="country_tp" array={countries}
                                       stringify={(item) => item.country}
                                       onSetValue={(country) => {setCountry(country)}}
                    />
                </div>}
                <input {...register("trip_id")} value={point.trip_id} hidden={true}/>
                <input {...register("trippoint_id")} value={point.trippoint_id} hidden={true}/>
                <button type="submit">Сохранить</button>
            </form>
        </Modal>
    );
}

export default EditTripPointModal;