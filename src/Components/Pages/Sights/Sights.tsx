import React from 'react';
import useFetch from "../../../Hooks/useFetch";
import {Sight} from "../../../Helpers/DataTypes";
import {Route, Routes} from "react-router-dom";
import useSwitch from "../../../Hooks/useSwitch";
import EmptyRoute from "../EmptyRoute";
import SightPage from "./SightPage";

function Sights() {
    const [refetch, flip] = useSwitch()
    const [sights] = useFetch<Sight[]>("sights/", refetch)
    const routes = sights?sights.map(s=>
    <Route path={s.sight_id.toString()} key={s.sight_id} element={<SightPage s={s} onChange={flip}/>}/> ):[]
    return (
        <Routes>
            {routes}
            <Route path="*" element={<EmptyRoute waiting={"достопримечательности"}/> }/>
        </Routes>
    );
}

export default Sights;