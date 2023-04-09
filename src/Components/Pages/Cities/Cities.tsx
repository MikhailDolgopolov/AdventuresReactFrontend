import React from 'react';
import {City} from "../../../Helpers/DataTypes";
import LoadingError from "../LoadingError";
import {Route, Routes} from "react-router-dom";
import CountryPage from "../Countries/CountryPage";
import EmptyRoute from "../EmptyRoute";
import CityPage from "./CityPage";

function Cities({array}:{array?:City[]}) {
    if(!array) return <LoadingError loadingObject ="countries" loading={true}/>
    const pages = array.map(city=>
        <Route key = {city.city} path={city.city} element={<CityPage city={city}/>}/>)
    return (
        <Routes>
            {pages}
            <Route path="*" element={<EmptyRoute waiting={"cities"}/>}/>
        </Routes>
    );
}

export default Cities;