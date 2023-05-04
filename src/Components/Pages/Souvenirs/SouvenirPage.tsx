import React, {useRef} from 'react';
import {City, Souvenir, Trip, TripPoint} from "../../../Helpers/DataTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";
import {post} from "../../../Server/Requests";
import EditSouvenirModal from "./EditSouvenirModal";
import useFetch from "../../../Hooks/useFetch";
import {useNavigate} from "react-router-dom";

export function SouvenirTitle(s:Souvenir){
    return s.name?s.name:(s.material?s.material+" "+s.type:s.type)
}

function SouvenirPage({s, onChange, types, materials, cities}:
                          {s:Souvenir, onChange:()=>void,
                              types?:string[], materials?:string[], cities?:City[]}) {
    const [points] = useFetch<TripPoint[]>("trippoints/")
    const [trippoint] = useFetch<TripPoint>('trippoints/'+s.trippoint_id)
    const navigate = useNavigate()
    const editRef = useRef<HTMLButtonElement>(null)

    function deleteSouvenir(){
        if(confirm("Вы собираетесь удалить "+SouvenirTitle(s)+". Продолжить?")){
            post("souvenirs/delete/", JSON.stringify(s)).then(()=>{
                onChange();
                navigate(-1)
            })
        }
    }
    return (
        <>
            <TitleSubtitle title={SouvenirTitle(s)} subtitle={s.city}/>
            {points&&<EditSouvenirModal s={s}
                                        onChange={onChange} trippoints={points} editSouvenirRef={editRef}
                cities={cities} types={types} materials={materials}/>}
            <div className="side-margins">
                <EditEntry onEdit={() => {}} onDelete={deleteSouvenir} editRef={editRef}/>
            </div>
        </>
    );
}

export default SouvenirPage;