import React from 'react';
import {TripPoint} from "../../../Helpers/Types";
import {Route, Routes} from "react-router-dom";
import CountryPage from "../Countries/CountryPage";
import EmptyRoute from "../EmptyRoute";
import TripPointPage from "./TripPointPage";

function Points({array}:{array:TripPoint[]}) {
    const pages = array.map(point=>
        <Route key = {point.trip_point_id} path={point.trip_point_id.toString()} element={<TripPointPage point={point}/>}/>)
    return (
        <Routes>
            {pages}
            <Route path="*" element={<EmptyRoute waiting={"trip point"}/>}/>
        </Routes>
    );
}

export default Points;