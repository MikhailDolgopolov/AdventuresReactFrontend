import React from 'react';
import TripPage from "./TripPage";
import {Route, Routes} from "react-router-dom";
import EmptyRoute from "../EmptyRoute";
import {MyData} from "../../../Helpers/HelperTypes";
import LoadingError from "../LoadingError";

function Trips({data}:{data:MyData}) {
    if(!data.trips) return <LoadingError loadingObject={"путешествия"} loading={data.loading} wholePage={true}/>
    let routes=
        data.trips.map(trip=>
            <Route path={trip.trip_id.toString()} key={trip.trip_id}
                   element={<TripPage trip={trip} data={data}/>}>
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