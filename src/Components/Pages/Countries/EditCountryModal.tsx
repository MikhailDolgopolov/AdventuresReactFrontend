import React, {useState} from 'react';
import {City, Country} from "../../../Helpers/DataTypes";
import Modal from "../../Fragments/Modal";
import useFetch from "../../../Hooks/useFetch";
import {useForm} from "react-hook-form";
import {post} from "../../../Server/Requests";
import useSwitch from "../../../Hooks/useSwitch";
import {useNavigate} from "react-router-dom";
import SearchInput from "../../Fragments/SearchInput";

function EditCountryModal({country, cities, openRef, onChange}:{country:Country, cities:City[], onChange:()=>void, openRef:React.MutableRefObject<any>}) {

    const [selectedCapital, setCapital] = useState<string>(country.capital_city)
    const [closeModal, flip] = useSwitch()
    const {register, handleSubmit} = useForm<Country>()
    const navigate = useNavigate()
    const onSubmit=handleSubmit((data:Country, e?:React.BaseSyntheticEvent)=>{
        e!.preventDefault()
        data.capital_city=selectedCapital;
        console.log(data)
        post("countries/update/"+country.country, JSON.stringify(data)).then((c:Country)=>{flip();onChange();
            if(country.country!=c.country) navigate("../"+c.country)})
    })
    return (
        <Modal header={"Изменить данные"} openRef={openRef} offToggle={closeModal}>
            <form className="vert-window" onSubmit={onSubmit}>
                <div className="form-row">
                    <label>Название: </label>
                    <input defaultValue={country.country} required={true} {...register("country")}/>
                </div>
                <div className="form-row">
                    <label>Население</label>
                    <input type="number" {...register("population")} defaultValue={country.population}/>
                </div>
                <div className="form-row">
                    <label>Площадь</label>
                    <input type="number" {...register("area")} defaultValue={country.area}/>
                </div>
                <div className="form-row">
                    <label>Столица: </label>
                    <SearchInput<City> id={"capitalSearch"} array={cities} stringify={(c)=>c.city} not_required={true}
                                       onSetValue={(s)=>setCapital(s)} defaultValue={country.capital_city}/>
                </div>
                <button type="submit">Сохранить</button>
            </form>
        </Modal>
    );
}

export default EditCountryModal;