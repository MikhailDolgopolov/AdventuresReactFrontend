import React from 'react';
import {Person} from "../../../Helpers/Types";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";

function PersonPage({person}:{person:Person}) {
    return (
        <>
            <TitleSubtitle title={person.first_name + " "+person.last_name}/>
            <div className="side-margins">
                {/*<EditEntry onEdit={() => {}} onDelete={() => {}}/>*/}
            </div>
        </>
    );
}

export default PersonPage;