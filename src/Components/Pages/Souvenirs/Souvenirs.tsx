import React from 'react';
import {City, Souvenir, TripPoint} from "../../../Helpers/DataTypes";
import useFetch from "../../../Hooks/useFetch";
import {Route, Routes} from "react-router-dom";
import SouvenirPage from "./SouvenirPage";
import EmptyRoute from "../EmptyRoute";
import useSwitch from "../../../Hooks/useSwitch";

function Souvenirs() {
    const [refetch, flip] = useSwitch()
    const [souvenirs]=useFetch<Souvenir[]>("souvenirs/", refetch)
    const [materials] = useFetch<string[]>("souvenirs/materials/", refetch)
    const [types] = useFetch<string[]>("souvenirs/types/", refetch)
    const [cities] = useFetch<City[]>("cities/")
    const routes = souvenirs?souvenirs.map(s=>
        <Route key={s.souvenir_id} path={s.souvenir_id.toString()} element={
            <SouvenirPage s={s} onChange={flip} cities={cities} types={types} materials={materials}/>}/>
    ):[]
    return (
        <Routes>
            {routes}
            <Route path="*" element={<EmptyRoute waiting={"сувениры"}/>}/>
        </Routes>
    );
}

export default Souvenirs;