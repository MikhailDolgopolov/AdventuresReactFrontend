import React from 'react';
import Trip from "./Trip";

function YearEntry({data}) {
    const trips=data.yearList.map(trip=>
        <Trip key={trip.trip_id} trip={trip}/>
    )
    return (
        <div className="grid">
            {trips}
        </div>
    );
}

export default YearEntry;