import React from 'react';
import YearEntry from "./YearEntry";

function YearSplitTrips(props) {
    let data=props.json;
    const rows = data.map(row=>
        <div key={row.year} className="shadow_under trip-row">
            <div>
                <p>{row.year} год</p>
            </div>
            <YearEntry className="grid" key={row.year} data={row}/>
        </div>

    )
    return (rows);
}

export default YearSplitTrips;