import React from 'react';
import {useNavigate} from 'react-router-dom';
import {getTripDate, Trip} from "../../../Types";


function TripBlock({trip}:{trip:Trip}) {
    const navigate = useNavigate();
    return (
        <div className="grid-block" onClick={()=>navigate('../trip/'+trip.trip_id)}>
            <button className="grid-button">
                <h3>{trip.title}</h3>
                <p>{getTripDate(trip)}</p>
                {trip.description !== null &&
                <p>{trip.description}</p>}
            </button>
        </div>
    );
}

export default TripBlock;