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
    const [people, loading]=useFetch<Person[]>("people/", refetch)
    if(!people) return <LoadingError loadingObject={"people"} loading={loading} wholePage={true}/>
    const pages = people.map(person=>
    <Route key={person.person_id} path={person.person_id.toString()} element={<PersonPage person={person} onChange={flip}/>}/> )
    return (
        <Routes>
            {pages}
            <Route path="*" element={<EmptyRoute waiting={"людей"}/>}/>
        </Routes>
    );
}

export default People;