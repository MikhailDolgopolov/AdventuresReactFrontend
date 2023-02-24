import React, {useEffect, useState} from 'react';
import TripPage from "./TripPage/TripPage";
import {Route, Routes} from "react-router-dom";
import EmptyRoute from "./EmptyRoute";
import {get} from "../../App";
import {Person, Trip} from "../../Types";

function Trips({people}:{people:Person[]}) {
    let [data, setTrips]=useState<Trip[]>([])
    useEffect(()=>{
        get('trips/list/').then(data=>setTrips(data));
    },[])
    let routes=
        data.map(trip=>
            <Route path={trip.trip_id.toString()} key={trip.trip_id}
                   element={<TripPage trip={trip} people={people}/>}>
            </Route>
        )
    return (
        <Routes>
            {routes}
            <Route path="*" element={<EmptyRoute/>}/>
        </Routes>
    );
}

export default Trips;