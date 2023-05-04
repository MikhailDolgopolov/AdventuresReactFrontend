import React from 'react';
import {Route, Routes} from "react-router-dom";
import EmptyRoute from "../EmptyRoute";
import TripPointPage from "./TripPointPage";
import LoadingError from "../LoadingError";
import useFetch from "../../../Hooks/useFetch";
import {City, TripPoint} from "../../../Helpers/DataTypes";
import useSwitch from "../../../Hooks/useSwitch";

function Points() {
    const [refetch, flip] = useSwitch()
    const [trippoints, loading] = useFetch<TripPoint[]>("trippoints/", refetch)
    const [cities] = useFetch<City[]>("cities/", refetch)
    if(!cities) return <LoadingError loadingObject={"cities"} loading={true}/>
    if(!trippoints) return <LoadingError loadingObject={"остановки"} loading={loading} wholePage={true}/>

    const pages = trippoints.map(point=>
        <Route key = {point.trippoint_id} path={point.trippoint_id.toString()}
               element={<TripPointPage point={point} cities={cities} onChange={flip}/>}/>)
    return (
        <Routes>
            {pages}
            <Route path="*" element={<EmptyRoute waiting={"trip point"}/>}/>
        </Routes>
    );
}

export default Points;