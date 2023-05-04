import React from 'react';
import TripPage from "./TripPage";
import {Route, Routes} from "react-router-dom";
import EmptyRoute from "../EmptyRoute";
import LoadingError from "../LoadingError";
import useFetch from "../../../Hooks/useFetch";
import {Trip} from "../../../Helpers/DataTypes";
import useSwitch from "../../../Hooks/useSwitch";

function Trips() {
    const [refetch, flip] = useSwitch()
    const [trips, loading] = useFetch<Trip[]>("trips/", refetch)
    if(!trips) return <LoadingError loadingObject={"путешествия"} loading={loading} wholePage={true}/>
    let routes=
        trips.map(trip=>
            <Route path={trip.trip_id.toString()} key={trip.trip_id}
                   element={<TripPage trip={trip} onChange={flip}/>}>
            </Route>
        )
    return (
        <Routes>
            {routes}
            <Route path="*" element={<EmptyRoute waiting="путешествия"/>}/>
        </Routes>
    );
}

export default Trips;