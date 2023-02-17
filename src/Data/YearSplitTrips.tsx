import React from 'react';
import YearEntry, {Entry} from "./YearEntry";

function YearSplitTrips({props}:{props:Entry[]}) {
    let rows= props.map(row =>
        <div key={row.year} className="shadow_under trip-row">
            <div>
                <p>{row.year} год</p>
            </div>
            <YearEntry {...row} key={row.year}/>
        </div>
    );
    return <div className="side_margins" >
        {rows}
    </div>
}

export default YearSplitTrips;