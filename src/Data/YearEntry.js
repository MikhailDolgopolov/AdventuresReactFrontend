import React from 'react';
import TripBlock from "./TripBlock";

function YearEntry({data}) {

    let trips=data.yearList.map(trip=>
        <TripBlock key={trip.trip_id} trip={trip}
                   />
    )
    return (
        <div className="grid">
            {trips}
        </div>
    );
}

export default YearEntry;