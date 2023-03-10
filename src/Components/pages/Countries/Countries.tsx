import React from 'react';
import {Country} from "../../../Helpers/Types";
import countryPage from "./CountryPage";
import {Route, Routes} from "react-router-dom";
import CountryPage from "./CountryPage";
import EmptyRoute from "../EmptyRoute";

function Countries({array}:{array:Country[]}) {
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