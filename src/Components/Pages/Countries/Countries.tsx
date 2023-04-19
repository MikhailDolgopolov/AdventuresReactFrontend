import React from 'react';
import {Country} from "../../../Helpers/DataTypes";
import {Route, Routes} from "react-router-dom";
import CountryPage from "./CountryPage";
import EmptyRoute from "../EmptyRoute";
import LoadingError from "../LoadingError";
import useFetch from "../../../Hooks/useFetch";
import useSwitch from "../../../Hooks/useSwitch";

function Countries() {
    const [refetch, flip] = useSwitch()
    const [countries, ] = useFetch<Country[]>("countries/", refetch)
    if(!countries) return <LoadingError loadingObject ="страны" loading={true}/>
    const pages = countries.map(country=>
    <Route key = {country.country} path={country.country} element={<CountryPage country={country} onChange={flip} />}/>)
    return (
        <Routes>
            {pages}
            <Route path="*" element={<EmptyRoute waiting={"страны"}/>}/>
        </Routes>
    );
}

export default Countries;