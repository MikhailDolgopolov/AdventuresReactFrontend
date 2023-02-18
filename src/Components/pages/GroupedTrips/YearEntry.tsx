import React from 'react';
import TripBlock from "./TripBlock";
import {Trip} from "../../../Types"

function YearEntry({props}:{props:Trip[]}) {

    let trips=props.map(trip=>
        <TripBlock key={trip.trip_id} trip={trip}/>
    )
    return (
        <div className="grid">
            {trips}
        </div>
    );
}

export default YearEntry;