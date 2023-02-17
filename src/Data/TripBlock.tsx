import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Trip} from "./TripPage";


function TripBlock(trip:Trip) {
    const navigate = useNavigate();
    return (
        <div className="grid-block" onClick={()=>navigate('../trip/'+trip.trip_id)}>
            <button className="grid-button">
                <h3>{trip.title}</h3>
                <p>{trip.start_date} - {trip.end_date}</p>
                {trip.description !== null &&
                <p>{trip.description}</p>}
            </button>
        </div>
    );
}

export default TripBlock;