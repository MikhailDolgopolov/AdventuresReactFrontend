import React, {useRef} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Souvenir, Trip, TripPoint} from "../../../Helpers/DataTypes";
import LoadingError from "../LoadingError";
import useFetch from "../../../Hooks/useFetch";


import {post} from "../../../Server/Requests";
import useSwitch from "../../../Hooks/useSwitch";
import SouvenirList from "../TripPage/Souvenirs/SouvenirList";
import AddSouvenirModal from "../TripPage/Souvenirs/AddSouvenirModal";
import Loading from "../Loading";

function TrippointSouvenirs({point}:{ point:TripPoint}) {

    const [refetch, setRefetch] = useSwitch()
    const [souvenirs, loadingSouvenirs] = useFetch<Souvenir[]>("souvenirs/for_trippoint/"+point.trippoint_id, refetch)
    const [points] = useFetch<TripPoint[]>("trippoints/for_trip/"+point.trip_id)

    const addSouvenirRef = useRef(null)

    if(!souvenirs) return <LoadingError loadingObject={"сувениры"} loading={loadingSouvenirs}/>

    return (
        <>
            {points&&<AddSouvenirModal points={points} openRef={addSouvenirRef} onCommit={setRefetch}/>}

            <section>
                <h2>Сувениры</h2>
                {points?<SouvenirList souvenirs={souvenirs} onChange={setRefetch} trippoints={points}/>:<Loading object={"сувениры"}/>}
                <div className="row edges">
                    <button className="big" ref={addSouvenirRef}>
                        <FontAwesomeIcon icon={faPlus} size="2x"/>
                    </button>
                </div>
            </section>
        </>
    );
}

export default TrippointSouvenirs;