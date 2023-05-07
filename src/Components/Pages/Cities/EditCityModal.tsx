import React, {useState} from 'react';
import Modal from "../../Fragments/Modal";
import {City, Country} from "../../../Helpers/DataTypes";
import {useForm} from "react-hook-form";
import SearchInput from "../../Fragments/SearchInput";
import useFetch from "../../../Hooks/useFetch";
import {post} from "../../../Server/Requests";
import useSwitch from "../../../Hooks/useSwitch";
import {useNavigate} from "react-router-dom";

function EditCityModal({city, openRef, onChange}:{city:City, onChange:()=>void, openRef:React.MutableRefObject<any>}) {
    const {register, handleSubmit} = useForm<City>()
    const [closeModal, flip] = useSwitch()
    const [countries] = useFetch<Country[]>("countries/")
    const [selectedCountry, setCountry] = useState<string>(city.country);
    const navigate = useNavigate()
    if(!countries) return <></>
    const onSubmit=handleSubmit((data:City, e?:React.BaseSyntheticEvent)=>{
        e!.preventDefault()
        data.country=selectedCountry;
        post("cities/update/"+city.city, JSON.stringify(data)).then((c:City)=>{onChange();flip();
            if(city.city!=data.city) navigate("../"+c.city)})
    })
    return (
        <Modal header={"Изменить данные"} openRef={openRef} offToggle={closeModal}>
            <form className="vert-window" onSubmit={onSubmit}>
                <div className="form-row">
                    <label>Название: </label>
                    <input required={true} {...register("city")} defaultValue={city.city}/>
                </div>
                <div className="form-row">
                    <label>Страна: </label>
                    <SearchInput<Country> id={"allCountries"} array={countries} stringify={(c)=>c.country}
                                          onSetValue={c=>setCountry(c)} onlySelect={true} defaultValue={city.country}/>
                </div>
                <div className="form-row">
                    <label>Население: </label>
                    <input type="number" {...register("population")} defaultValue={city.population}/>
                </div>
                <div className="form-row">
                    <label>Год основания: </label>
                    <input type="number" {...register("founded_year")} defaultValue={city.founded_year}/>
                </div>
                <button type={"submit"}>Сохранить</button>
            </form>
        </Modal>
    );
}

export default EditCityModal;