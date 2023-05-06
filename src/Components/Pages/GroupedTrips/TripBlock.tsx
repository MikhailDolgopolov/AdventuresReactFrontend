import React from 'react';
import {useNavigate} from 'react-router-dom';
import {getTripDate, Trip} from "../../../Helpers/DataTypes";
import Date from "../../Fragments/date";


function TripBlock({trip}:{trip:Trip}) {
    const navigate = useNavigate();
    return (
            <button className="grid-block highlight" onClick={()=>navigate('/trip/'+trip.trip_id)}>
                <h3>{trip.title + " "}</h3>
                <Date d1={trip.start_date} d2={trip.end_date}/>
                {trip.description !== null &&
                <p>{trip.description}</p>}
            </button>
    );
}

export default TripBlock;