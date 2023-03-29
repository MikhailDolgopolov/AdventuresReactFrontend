import React from 'react';
import useFetch from "../../../Hooks/useFetch";
import {Trip} from "../../../Helpers/Types";
import SmartWaiter from "../../../Helpers/SmartWaiter";
import LoadingError from "../LoadingError";
import TripBlock from "./TripBlock";

function YearEntry({year, refetch}:{year:number,refetch?:any}) {
    const [trips, loadTrips, errorTrips] = useFetch<Trip[]>("trips/years/"+year)
    if(!trips) return <LoadingError loadingObject={"year's trips"} loading={loadTrips}/>
    const blocks = trips.map(trip=><TripBlock key = {trip.trip_id} trip={trip}/>)
    return <div className="outline trip-row">
        <div className="row">
            <h3>{year} год</h3>
        </div>
        <div className="grid">
            {trips.map(trip=>
                <TripBlock key = {trip.trip_id} trip={trip}/>)
            }
        </div>
    </div>;
}

export default YearEntry;