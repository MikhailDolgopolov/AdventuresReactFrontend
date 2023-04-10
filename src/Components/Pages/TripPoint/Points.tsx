import React from 'react';
import {MyData} from "../../../Helpers/HelperTypes";
import {Route, Routes} from "react-router-dom";
import EmptyRoute from "../EmptyRoute";
import TripPointPage from "./TripPointPage";
import LoadingError from "../LoadingError";

function Points({data}:{data:MyData}) {
    if(!data.trippoints) return <LoadingError loadingObject={"остановки"} loading={data.loading} wholePage={true}/>
    if(!data.cities) return <LoadingError loadingObject={"cities"} loading={data.loading}/>
    const pages = data.trippoints.map(point=>
        <Route key = {point.trip_point_id} path={point.trip_point_id.toString()}
               element={<TripPointPage point={point} cities={data.cities!}/>}/>)
    return (
        <Routes>
            {pages}
            <Route path="*" element={<EmptyRoute waiting={"trip point"}/>}/>
        </Routes>
    );
}

export default Points;