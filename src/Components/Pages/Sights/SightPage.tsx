import React, {useRef} from 'react';
import {City, Sight, Souvenir} from "../../../Helpers/DataTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import {post} from "../../../Server/Requests";
import {useNavigate} from "react-router-dom";
import EditEntry from "../../Fragments/EditEntry";
import EditSightModal from "./EditSightModal";
import cities from "../Cities/Cities";
import useFetch from "../../../Hooks/useFetch";
import SouvenirBlock from "../Trips/Souvenirs/SouvenirBlock";
import SightBlock from "./SightBlock";

function SightPage({s, onChange, cities, types}:{s:Sight, onChange:()=>void, cities?:City[], types?:string[]}) {
    const navigate=useNavigate()
    const editRef = useRef<HTMLButtonElement>(null)
    const [similarSights] = useFetch<Sight[]>("sights/similar_to/"+s.sight_id)
    function deleteSight(){
        if(window.confirm("Вы собираетесь удалить "+s.name+". Продолжить?")){
            post("sights/delete/", JSON.stringify(s)).then(()=>{
                onChange();
                navigate(-1)
            })
        }
    }

    return (
        <>
            <TitleSubtitle title={s.name} subtitle={s.city}/>
            <EditSightModal s={s} openRef={editRef} onChange={onChange} cities={cities} types={types}/>
            <div className="side-margins">
                <EditEntry onEdit={() => {}} onDelete={deleteSight} editRef={editRef}>
                    <button className="self-left" data-selected="0" onClick={()=>navigate("/cities/"+s.city)}>{s.city}</button>
                </EditEntry>
                <div className="two-columns">
                    <div className="flow-down">
                        {similarSights && similarSights.length>0&&<section>
                            <h2>Похожие</h2>
                            <h4><span>{s.type}</span> или <span>{s.city}</span></h4>
                            <div className="flex-grid outline">
                                {similarSights
                                    .map(s=>
                                        <SightBlock s={s} key={s.sight_id}/>)}
                            </div>
                        </section>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SightPage;