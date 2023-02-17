import React, {useEffect, useState} from 'react';
import TripPage, {Trip} from "../Data/TripPage";
import {Route, Routes} from "react-router-dom";
import EmptyRoute from "../EmptyRoute";
import {getRequest} from "../App";

function Trips() {
    let [data, setTrips]=useState<Trip[]>([])
    useEffect(()=>{
        getRequest('trips/list/').then(data=>setTrips(data));
    },[])
    let routes=()=>{
        return data.map(trip=>
            <Route path={trip.trip_id.toString()} key={trip.trip_id}
                   element={<TripPage {...trip}/>}>
            </Route>
        )
    }
    return (
        <Routes>
            {routes()}
            <Route path="trips/*" element={<EmptyRoute/>}/>
        </Routes>
    );
}

export default Trips;