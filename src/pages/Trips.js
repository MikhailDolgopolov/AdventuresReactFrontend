import React, {useEffect, useState} from 'react';
import Trip from "../Data/Trip";
import {Route, Routes} from "react-router-dom";
import EmptyRoute from "../EmptyRoute";
import {getRequest} from "../App";

function Trips() {
    let [data, setTrips]=useState([])
    useEffect(()=>{
        getRequest('trips/list/').then(data=>setTrips(data));
    },[])
    let routes=()=>{
        return data.map(trip=>
            <Route path={trip.trip_id.toString()} key={trip.trip_id}
                   element={<Trip trip={trip}/>}>
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