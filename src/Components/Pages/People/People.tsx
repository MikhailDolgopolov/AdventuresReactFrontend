import React from 'react';
import {Person} from "../../../Helpers/DataTypes";
import {Route, Routes} from "react-router-dom";
import PersonPage from "./PersonPage";
import EmptyRoute from "../EmptyRoute";
import LoadingError from "../LoadingError";

function People({array}:{array?:Person[]}) {
    if(!array) return <LoadingError loadingObject={"people"} loading={true}/>
    const pages = array.map(person=>
    <Route key={person.person_id} path={person.person_id.toString()} element={<PersonPage person={person}/>}/> )
    return (
        <Routes>
            {pages}
            <Route path="*" element={<EmptyRoute waiting={"people"}/>}/>
        </Routes>
    );
}

export default People;