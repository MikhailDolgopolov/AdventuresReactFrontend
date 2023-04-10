import React, {useRef} from 'react';
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import {City} from "../../../Helpers/DataTypes";
import EditEntry from "../../Fragments/EditEntry";

function CityPage({city}:{city:City}) {
    let editRef = useRef<HTMLButtonElement>(null)
    return (
        <>
            <TitleSubtitle title={city.city}/>
            <div className="side-margins">
                <EditEntry onEdit={() => {}} onDelete={() => {}} editRef={editRef}/>
            </div>
        </>
    );
}

export default CityPage;