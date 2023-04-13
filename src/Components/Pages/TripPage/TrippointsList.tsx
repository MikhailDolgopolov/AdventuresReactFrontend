import React from 'react';
import useFetch from "../../../Hooks/useFetch";
import {Trip, TripPoint} from "../../../Helpers/DataTypes";
import LoadingError from "../LoadingError";
import {useNavigate} from "react-router-dom";

function TrippointsList({trip, clickAction}:{trip:Trip, clickAction:{(arg0:TripPoint):any}}) {
    const [trippoints, loadingTrippoints] = useFetch<TripPoint[]>('trips/' + trip.trip_id + '/trippoints/')
    const navigate=useNavigate();
    if(!trippoints) return <LoadingError loadingObject={"остановки"} loading={loadingTrippoints}/>
    const allPoints = trippoints!.map(point =>
        <div className="flex-block full" key={point.trippoint_id}>
            <button className="highlight" onClick={()=>{
                clickAction(point)
            }}>
                <h3>{point.title}</h3>
                {(trippoints.length>1) && <h5>{point.city}</h5>}
                {/*{point.trip_order}*/}
            </button>
        </div>)
    return (
        <>
            {(allPoints.length>0)?<div className="flex-grid">
                {allPoints}
            </div>:
            <div className="side-margins">
                <p>Сначала добавьте хотя бы одну остановку</p>
            </div> }
        </>
    );
}

export default TrippointsList;