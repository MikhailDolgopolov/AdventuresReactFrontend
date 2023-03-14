import React from 'react';
import {Country} from "../../../Helpers/Types";
import {Route, Routes} from "react-router-dom";
import CountryPage from "./CountryPage";
import EmptyRoute from "../EmptyRoute";
import LoadingError from "../LoadingError";

function Countries({array}:{array?:Country[]}) {
    if(!array) return <LoadingError loadingObject ="countries"/>
    const pages = array.map(country=>
    <Route key = {country.country} path={country.country} element={<CountryPage country={country}/>}/>)
    return (
        <Routes>
            {pages}
            <Route path="*" element={<EmptyRoute waiting={"countries"}/>}/>
        </Routes>
    );
}

export default Countries;