import React, {useRef} from 'react';
import {Person} from "../../../Helpers/DataTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";

function PersonPage({person}:{person:Person}) {
    let editRef = useRef<HTMLButtonElement>(null)
    return (
        <>
            <TitleSubtitle title={person.first_name + " "+person.last_name}/>
            <div className="side-margins">
                <EditEntry onEdit={() => {}} onDelete={() => {}} editRef={editRef}/>
            </div>
        </>
    );
}

export default PersonPage;