import React from 'react';
import {Person} from "../../../Helpers/Types";
import {Route, Routes} from "react-router-dom";
import PersonPage from "./PersonPage";
import EmptyRoute from "../EmptyRoute";

function People({array}:{array:Person[]}) {
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