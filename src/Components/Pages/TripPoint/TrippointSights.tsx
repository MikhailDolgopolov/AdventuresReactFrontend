import React, {useRef} from 'react';
import {SightVisitCombined, TripPoint} from "../../../Helpers/DataTypes";
import useFetch from "../../../Hooks/useFetch";
import SightList from "../TripPage/Sights/SightList";
import LoadingError from "../LoadingError";
import AddSightModal from "../TripPage/Sights/AddSightModal";
import useSwitch from "../../../Hooks/useSwitch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function TrippointSights({point}:{point:TripPoint}) {
    const [modalSwitch, flip] = useSwitch()
    const [sights, loadingSights] = useFetch<SightVisitCombined[]>("sights/for_trippoint/"+point.trippoint_id)
    const [points, loadingPoints] = useFetch<TripPoint[]>("trippoints/for_trip/"+point.trip_id)
    const addSightRef = useRef(null)
    if(!sights || !points) return <LoadingError loadingObject={"достопримечательности"} loading={loadingSights||loadingPoints}/>
    return (
        <section>
            <h2>Достопримечательности</h2>
            <AddSightModal addSightRef={addSightRef} closeSwitch={modalSwitch} points={points} trip_id={point.trip_id} onChange={flip}/>
            <SightList sights={sights} trippoints={points} onChange={() => sights}/>
            <div className="row">
                <button className="center-child big" ref={addSightRef}>
                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                </button>
            </div>
        </section>
    );
}

export default TrippointSights;