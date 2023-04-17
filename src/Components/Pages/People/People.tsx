import React from 'react';
import {Person} from "../../../Helpers/DataTypes";
import {Route, Routes} from "react-router-dom";
import PersonPage from "./PersonPage";
import EmptyRoute from "../EmptyRoute";
import LoadingError from "../LoadingError";
import useSwitch from "../../../Hooks/useSwitch";
import useFetch from "../../../Hooks/useFetch";

function People() {
    const [refetch, flip] = useSwitch()
    const [people, loading]=useFetch<Person[]>("people/")
    if(!people) return <LoadingError loadingObject={"people"} loading={loading}/>
    const pages = people.map(person=>
    <Route key={person.person_id} path={person.person_id.toString()} element={<PersonPage person={person}/>}/> )
    return (
        <Routes>
            {pages}
            <Route path="*" element={<EmptyRoute waiting={"people"}/>}/>
        </Routes>
    );
}

export default People;