import React from 'react';
import {Entry} from "../../../Helpers/Types";
import TripBlock from "./TripBlock";
import {useNavigate} from "react-router-dom";

function YearSplitTrips({entries}:{entries:Entry[]}) {
    const navigate = useNavigate();
    return <div className="side_margins vert-margins" >
        {entries.map(row =>
            <div key={row.year} className="outline trip-row">
                <div className="row">
                    <h3>{row.year} год</h3>
                </div>
                <div className="grid">
                    {row.yearList.map(trip=>
                        <TripBlock key = {trip.trip_id} trip={trip}/>)
                    }
                </div>
            </div>
        )}
    </div>
}

export default YearSplitTrips;