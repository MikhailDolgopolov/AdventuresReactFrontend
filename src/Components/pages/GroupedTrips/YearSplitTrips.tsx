import React from 'react';
import YearEntry from "./YearEntry";
import {Entry, getTripDate} from "../../../Helpers/Types";
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
                        <button key={trip.trip_id} className="grid-block" onClick={()=>navigate('../trip/'+trip.trip_id)}>
                            <h3>{trip.title}</h3>
                            <p>{getTripDate(trip)}</p>
                        </button>)
                    }
                </div>
            </div>
        )}
    </div>
}

export default YearSplitTrips;