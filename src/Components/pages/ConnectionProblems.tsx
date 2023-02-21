import React from 'react';
import TitleSubtitle from "../Fragments/TitleSubtitle";

function ConnectionProblems({props}:{props:string}) {
    return (
        <div>
            <TitleSubtitle title={"Server error"}/>
            <div className="side-margins">
                <b>Something went wrong on the server side</b>
                <p>Not much is known, but {props}</p>
            </div>
        </div>
    );
}

export default ConnectionProblems;