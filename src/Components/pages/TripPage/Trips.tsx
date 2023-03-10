import React, {useEffect, useState} from 'react';
import TripPage from "./TripPage";
import {Route, Routes} from "react-router-dom";
import EmptyRoute from "../EmptyRoute";
import {get} from "../../../Server/Requests";
import {City, Country, Person, Trip} from "../../../Helpers/Types";

function Trips({people, cities, countries}:{people:Person[], cities:City[], countries : Country[]}) {
    let [data, setTrips]=useState<Trip[]>([])
    useEffect(()=>{
        get('trips/list/').then(data=>setTrips(data));
    },[])
    let routes=
        data.map(trip=>
            <Route path={trip.trip_id.toString()} key={trip.trip_id}
                   element={<TripPage trip_id={trip.trip_id} people={people} cities={cities} countries={countries}/>}>
            </Route>
        )
    return (
        <Routes>
            {routes}
            <Route path="*" element={<EmptyRoute waiting="trips"/>}/>
        </Routes>
    );
}

export default Trips;