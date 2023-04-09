import React, {useRef} from 'react';
import {Country} from "../../../Helpers/DataTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";

function CountryPage({country} : {country:Country}) {
    let editRef = useRef<HTMLButtonElement>(null)
    return (
        <>
            <TitleSubtitle title={country.country}/>
            <div className="side-margins">
                <EditEntry onEdit={() => {}} onDelete={() => {}} editRef={editRef}/>
            </div>
        </>
    );
}

export default CountryPage;