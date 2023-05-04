import React, {useRef} from 'react';
import {Souvenir, Trip, TripPoint} from "../../../../Helpers/DataTypes";
import useFetch from "../../../../Hooks/useFetch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import SouvenirList from "./SouvenirList";
import AddSouvenirModal from "./AddSouvenirModal";
import useSwitch from "../../../../Hooks/useSwitch";

function SouvenirsSection({trip, points}:{trip:Trip, points?:TripPoint[]}) {
    const [refetch, flip] = useSwitch()
    const [souvenirs, loadingSouvenirs] = useFetch<Souvenir[]>("souvenirs/for_trip/"+trip.trip_id, refetch)
    const addSouvenirRef = useRef(null)

    if(!souvenirs) return <></>

    return (
        <section>
            <h2>Сувениры</h2>
            {points&&<><AddSouvenirModal points={points} openRef={addSouvenirRef} onCommit={()=>flip()}/>

           <SouvenirList souvenirs={souvenirs} onChange={()=>flip()} trippoints={points}/></>}
            <div className="row edges">
                <button className="big" ref={addSouvenirRef}>
                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                </button>
            </div>
        </section>
    );
}

export default SouvenirsSection;