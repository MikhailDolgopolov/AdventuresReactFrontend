import React from 'react';
import YearEntry from "./YearEntry";
import Loading from "../Fragments/Loading";

function YearSplitTrips(props) {
    if(!props) return <Loading/>
    let data=props.json;
    return data.map(row =>
        <div key={row.year} className="shadow_under trip-row">
            <div>
                <p>{row.year} год</p>
            </div>
            <YearEntry className="grid" key={row.year} data={row}/>
        </div>
    );
}

export default YearSplitTrips;