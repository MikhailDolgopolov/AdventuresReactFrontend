import React from 'react';
import {useNavigate} from 'react-router-dom';
import {getTripDate, Trip} from "../../../Helpers/Types";


function TripBlock({trip}:{trip:Trip}) {
    const navigate = useNavigate();
    return (
            <button className="grid-block" onClick={()=>navigate('../trip/'+trip.trip_id)}>
                <h3>{trip.title}</h3>
                <p>{getTripDate(trip)}</p>
                {trip.description !== null &&
                <p>{trip.description}</p>}
            </button>
    );
}

export default TripBlock;