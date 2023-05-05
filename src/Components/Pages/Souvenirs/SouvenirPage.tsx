import React, {useRef} from 'react';
import {City, Country, Souvenir, Trip, TripPoint} from "../../../Helpers/DataTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";
import {post} from "../../../Server/Requests";
import EditSouvenirModal from "./EditSouvenirModal";
import useFetch from "../../../Hooks/useFetch";
import {useNavigate} from "react-router-dom";
import SouvenirBlock from "../Trips/Souvenirs/SouvenirBlock";

export function SouvenirTitle(s:Souvenir){
    return s.name?s.name:(s.material?s.material+" "+s.type:s.type)
}

function SouvenirPage({s, onChange, types, materials, cities}:
                          {s:Souvenir, onChange:()=>void,
                              types?:string[], materials?:string[], cities?:City[]}) {
    const [points] = useFetch<TripPoint[]>("trippoints/")
    const [relatedCity] = useFetch<City>("cities/"+s.city);
    const [similarSouvenirs] = useFetch<Souvenir[]>("souvenirs/similar_to/"+s.souvenir_id)
    const navigate = useNavigate()
    const editRef = useRef<HTMLButtonElement>(null)

    function deleteSouvenir(){
        if(window.confirm("Вы собираетесь удалить "+SouvenirTitle(s)+". Продолжить?")){
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
                <div className="two-columns">
                    <div className="flow-down">
                        {similarSouvenirs && similarSouvenirs.length>1&&<section>
                            <h2>Похожие</h2>
                            <h4><span>{s.type}</span>, <span>{relatedCity&&relatedCity.country}</span></h4>
                            <div className="flex-grid">
                                {similarSouvenirs.filter(other=>s.souvenir_id!=other.souvenir_id)
                                    .map(s=>
                                    <SouvenirBlock s={s} key={s.souvenir_id}/>)}
                            </div>
                        </section>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SouvenirPage;