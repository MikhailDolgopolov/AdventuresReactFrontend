import React from 'react';
import {City} from "../../../Helpers/DataTypes";
import LoadingError from "../LoadingError";
import {Route, Routes} from "react-router-dom";
import EmptyRoute from "../EmptyRoute";
import CityPage from "./CityPage";
import useFetch from "../../../Hooks/useFetch";
import useSwitch from "../../../Hooks/useSwitch";

function Cities() {
    const [refetch, flip] = useSwitch()
    const [array, loading] = useFetch<City[]>("cities/", refetch)
    if(!array) return <LoadingError loadingObject ="города" loading={loading}/>
    const pages = array.map(city=>
        <Route key = {city.city} path={city.city} element={<CityPage city={city} onChange={flip}/>}/>)
    return (
        <Routes>
            {pages}
            <Route path="*" element={<EmptyRoute waiting={"города"}/>}/>
        </Routes>
    );
}

export default Cities;