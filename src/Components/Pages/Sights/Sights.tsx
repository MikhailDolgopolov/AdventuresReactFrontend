import React from 'react';
import useFetch from "../../../Hooks/useFetch";
import {City, Sight} from "../../../Helpers/DataTypes";
import {Route, Routes} from "react-router-dom";
import useSwitch from "../../../Hooks/useSwitch";
import EmptyRoute from "../EmptyRoute";
import SightPage from "./SightPage";
import LoadingError from "../LoadingError";

function Sights() {
    const [refetch, flip] = useSwitch()
    const [sights, loadingSights] = useFetch<Sight[]>("sights/", refetch)
    const [cities] = useFetch<City[]>("cities/", refetch)
    const [sightTypes] = useFetch<string[]>("sights/types/", refetch)
    if(!sights) return <LoadingError loadingObject={"достопримечательности"} loading={loadingSights} wholePage={true}/>
    const routes = sights.map(s=>
    <Route path={s.sight_id.toString()} key={s.sight_id} element={
        <SightPage s={s} onChange={flip} cities={cities} types={sightTypes}/>}/> )
    return (
        <Routes>
            {routes}
            <Route path="*" element={<EmptyRoute waiting={"достопримечательности"}/> }/>
        </Routes>
    );
}

export default Sights;