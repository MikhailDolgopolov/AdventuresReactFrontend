import React from 'react';
import TripBlock from "./TripBlock";
import {Trip} from "./TripPage"

export type Entry = {
    year : number
    yearList : Array<Trip>
}

function YearEntry(data: Entry) {

    let trips=data.yearList.map(trip=>
        <TripBlock key={trip.trip_id} {...trip}/>
    )
    return (
        <div className="grid">
            {trips}
        </div>
    );
}

export default YearEntry;