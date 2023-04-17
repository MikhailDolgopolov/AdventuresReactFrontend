import React, {useRef} from 'react';
import {Country} from "../../../Helpers/DataTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";
import {post} from "../../../Server/Requests";
import {useNavigate} from "react-router-dom";

function CountryPage({country, onChange} : {country:Country, onChange:()=>void}) {
    const navigate = useNavigate();
    let editRef = useRef<HTMLButtonElement>(null)
    function deleteCountry(){
        if(confirm("Вы собираетесь удалить все данные, связанные с "+country.country+". Продолжить?")){
            post("countries/delete/", country.country).then(()=>{
                onChange()
                navigate(-1)
            })
        }
    }
    return (
        <>
            <TitleSubtitle title={country.country}/>
            <div className="side-margins">
                <EditEntry onEdit={() => {}} onDelete={deleteCountry} editRef={editRef}/>
            </div>
        </>
    );
}

export default CountryPage;