import React, {useRef} from 'react';
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import {City} from "../../../Helpers/DataTypes";
import EditEntry from "../../Fragments/EditEntry";
import {post} from "../../../Server/Requests";
import {useNavigate} from "react-router-dom";
import EditCityModal from "./EditCityModal";

function CityPage({city, onChange}:{city:City, onChange:()=>void}) {
    const navigate=useNavigate()
    let editRef = useRef<HTMLButtonElement>(null)
    function deleteCity(){
        if(confirm("Вы собираетесь удалить все данные, связанные с "+city.city+". Продолжить?")){
            post("cities/delete/", city.city).then(()=>{
                onChange()
                navigate(-1)
            })
        }
    }
    return (
        <>
            <TitleSubtitle title={city.city}/>
            <EditCityModal city={city} openRef={editRef} onChange={onChange}/>
            <div className="side-margins">
                <EditEntry onEdit={()=>{}} onDelete={deleteCity} editRef={editRef}/>
            </div>
        </>
    );
}

export default CityPage;