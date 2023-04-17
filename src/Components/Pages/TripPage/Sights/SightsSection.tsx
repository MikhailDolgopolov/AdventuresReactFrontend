import React, {useEffect, useRef, useState} from 'react';
import {City, Sight, SightVisit, SightVisitCombined, Trip, TripPoint} from "../../../../Helpers/DataTypes";
import useFetch from "../../../../Hooks/useFetch";
import LoadingError from "../../LoadingError";
import SightList from "./SightList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import useSwitch from "../../../../Hooks/useSwitch";
import AddSightModal from "./AddSightModal";


function SightsSection({trip, points}:{trip:Trip, points:TripPoint[]}) {



    const [closeAdder, close] = useSwitch()
    const [refetch, flip] = useSwitch()
    const [sights, loadingSights] = useFetch<SightVisitCombined[]>("sights/for_trip/"+trip.trip_id, closeAdder!=refetch)

    const addSightRef = useRef(null)


    if(!sights) return <LoadingError loadingObject={"достопримечательности"} loading={loadingSights}/>
    return (
        <section>
            <h2>Достопримечательности</h2>
            <AddSightModal addSightRef={addSightRef} closeSwitch={closeAdder} onChange={flip} points={points} trip_id={trip.trip_id}/>
            <SightList sights={sights} onChange={close} trippoints={points}/>
            <div className="row edges">
                <button className="big" ref={addSightRef}>
                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                </button>
            </div>
        </section>
    );
}

export default SightsSection;