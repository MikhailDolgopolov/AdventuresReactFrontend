import React, {useEffect, useState} from 'react';
import useFetch from "../../../Hooks/useFetch";
import {Trip} from "../../../Helpers/DataTypes";
import SmartWaiter from "../../../Helpers/SmartWaiter";
import LoadingError from "../LoadingError";
import TripBlock from "./TripBlock";

function YearEntry({year, refetch}:{year:number,refetch?:any}) {
    const [trips, loadTrips, errorTrips] = useFetch<Trip[]>("trips/years/"+year, refetch)
    let blocks:JSX.Element[]
    if(trips)
        blocks = trips.map(trip=><TripBlock key = {trip.trip_id} trip={trip}/>)
    return <div className="outline trip-row">
        <div className="row">
            <h3>{year} год</h3>
        </div>
        {(trips)?
        <div className="grid">
            {trips.map(trip=>
                <TripBlock key = {trip.trip_id} trip={trip}/>)
            }
        </div>:<LoadingError loadingObject={"путешествия в "+year} loading={loadTrips}/>}
    </div>;
}

export default YearEntry;