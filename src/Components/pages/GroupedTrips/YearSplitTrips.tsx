import React from 'react';
import YearEntry from "./YearEntry";
import {Entry} from "../../../Types";

function YearSplitTrips({props}:{props:Entry[]}) {
    let rows= props.map(row =>
        <div key={row.year} className="shadow_under trip-row">
            <div>
                <p>{row.year} год</p>
            </div>
            <YearEntry props={row.yearList} key={row.year}/>
        </div>
    );
    return <div className="side_margins vert-margins" >
        {rows}
    </div>
}

export default YearSplitTrips;