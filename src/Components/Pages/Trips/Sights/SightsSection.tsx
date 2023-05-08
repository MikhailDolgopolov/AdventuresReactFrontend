import React, {useRef} from 'react';
import {SightVisitCombined, Trip, TripPoint} from "../../../../Helpers/DataTypes";
import useFetch from "../../../../Hooks/useFetch";
import LoadingError from "../../LoadingError";
import SightVisitList from "./SightVisitList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import useSwitch from "../../../../Hooks/useSwitch";
import AddSightVisitModal from "./AddSightVisitModal";


function SightsSection({trip, points}:{trip:Trip, points:TripPoint[]}) {



    const [refetch, flip] = useSwitch()
    const [sights, loadingSights] = useFetch<SightVisitCombined[]>("sights/for_trip/"+trip.trip_id, refetch)

    const addSightRef = useRef(null)


    if(!sights) return <LoadingError loadingObject={"достопримечательности"} loading={loadingSights}/>
    return (
        <section>
            <h2>Достопримечательности</h2>
            <AddSightVisitModal addSightRef={addSightRef} onChange={flip} closeSwitch={refetch} points={points} trip_id={trip.trip_id}/>
            <SightVisitList sights={sights} onChange={()=>{flip();close()}} trippoints={points}/>
            <div className="row edges">
                <button className="big" ref={addSightRef}>
                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                </button>
            </div>
        </section>
    );
}

export default SightsSection;