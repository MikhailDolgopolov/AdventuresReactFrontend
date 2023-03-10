import React from 'react';
import {Country} from "../../../Helpers/Types";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";

function CountryPage({country} : {country:Country}) {
    return (
        <>
            <TitleSubtitle title={country.country}/>
            <div className="side-margins">
                {/*<EditEntry onEdit={() => {}} onDelete={() => {}}/>*/}
            </div>
        </>
    );
}

export default CountryPage;