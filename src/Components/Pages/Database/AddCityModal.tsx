import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {City, Country} from "../../../Helpers/DataTypes";
import Modal from "../../Fragments/Modal";
import SearchInput from "../../Fragments/SearchInput";
import useFetch from "../../../Hooks/useFetch";
import {post} from "../../../Server/Requests";
import useSwitch from "../../../Hooks/useSwitch";

function AddCityModal({addCityButton, onAdd, defaultCountry}:{onAdd:()=>void, defaultCountry?:string,
    addCityButton:React.MutableRefObject<HTMLElement|null>}) {
    const [toggleModal, flip] = useSwitch();
    const [countries] = useFetch<Country[]>("countries/")
    const [selectedCountry, setCountry] = useState<string>(defaultCountry?defaultCountry:"");
    const {register, handleSubmit} = useForm<City>();
    if(!countries) return <></>
    const onSubmit = handleSubmit((data, e?: React.BaseSyntheticEvent)=>{
        e!.preventDefault();
        if(selectedCountry.length==0){
            alert("Страна введена некорректно")
            return
        }
        data.country=selectedCountry;
        post("cities/create/", JSON.stringify(data)).then(()=>{flip();onAdd();})
    })
    return (
        <Modal header="Добавить город" openRef={addCityButton} offToggle={toggleModal}>
            <form className="vert-window" onSubmit={onSubmit}>
                <div className="form-row">
                    <label>Название: </label>
                    <input required={true} {...register("city")}/>
                </div>
                {!defaultCountry&&<div className="form-row">
                    <label>Страна: </label>
                    <SearchInput<Country> id={"allCountries"} array={countries} stringify={(c)=>c.country}
                                          onSetValue={c=>setCountry(c)} onlySelect={true}/>
                </div>}
                <div className="form-row">
                    <label>Население: </label>
                    <input type="number" {...register("population")}/>
                </div>
                <div className="form-row">
                    <label>Год основания: </label>
                    <input type="number" {...register("founded_year")}/>
                </div>
                <button type="submit">Добавить</button>
            </form>
        </Modal>
    );
}

export default AddCityModal;