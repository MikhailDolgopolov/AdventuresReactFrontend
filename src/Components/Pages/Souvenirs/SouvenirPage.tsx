import React, {useRef} from 'react';
import {City, Country, Souvenir, Trip, TripPoint} from "../../../Helpers/DataTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";
import {post} from "../../../Server/Requests";
import EditSouvenirModal from "./EditSouvenirModal";
import useFetch from "../../../Hooks/useFetch";
import {useNavigate} from "react-router-dom";
import SouvenirBlock from "../Trips/Souvenirs/SouvenirBlock";
import useSwitch from "../../../Hooks/useSwitch";

export function SouvenirTitle(s:Souvenir){
    return s.name?(s.type?s.type+" "+s.name:s.name):(s.material?s.material+" "+s.type:s.type)
}

function SouvenirPage({s, onChange, types, materials, cities}:
                          {s:Souvenir, onChange:()=>void,
                              types?:string[], materials?:string[], cities?:City[]}) {
    const [refetch, flip] = useSwitch()
    const [points] = useFetch<TripPoint[]>("trippoints/related_to_souvenir/"+s.souvenir_id)
    const [relatedCity] = useFetch<City>("cities/for_souvenir/"+s.souvenir_id, refetch);
    const [similarSouvenirs] = useFetch<Souvenir[]>("souvenirs/similar_to/"+s.souvenir_id, refetch)
    const [relatedTrippoint] = useFetch<TripPoint>("trippoints/for_souvenir/"+s.souvenir_id, refetch)
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
                                        onChange={()=>{onChange();flip()}} trippoints={points} editSouvenirRef={editRef}
                cities={cities} types={types} materials={materials}/>}
            <div className="side-margins">
                <EditEntry onEdit={() => {}} onDelete={deleteSouvenir} editRef={editRef}>
                    <>{relatedCity&&<button data-selected="0" onClick={()=>navigate("/cities/"+relatedCity.city)}>
                        {relatedCity.city} (город)</button>}</>
                    <>{relatedTrippoint&&<button data-selected="0" className="self-left" onClick={()=>navigate("/trippoints/"+s.trippoint_id)}>
                        {relatedTrippoint.title} (остановка)</button> }</>
                    <div></div>
                </EditEntry>
                <div className="two-columns">
                    <div className="flow-down">
                        {similarSouvenirs && similarSouvenirs.length>0&&<section>
                            <h2>Похожие</h2>
                            <h4>{s.type} {s.material} или <span>{relatedCity&&relatedCity.country}</span></h4>
                            <div className="flex-grid outline">
                                {similarSouvenirs
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