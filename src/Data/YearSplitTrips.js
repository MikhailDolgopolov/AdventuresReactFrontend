import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import YearEntry from "./YearEntry";

function YearSplitTrips(props) {
    let data=props.json;
    const rows = data.map(row=>
        <Route path={row.year} key={row.year} className="shadow_under trip-row">
            <div>
                <p>{row.year} год</p>
            </div>
            <YearEntry className="grid" key={row.year} data={row}/>
        </Route>

    )
    return rows;
}

export default YearSplitTrips;