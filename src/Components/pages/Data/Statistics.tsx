import React, {useEffect, useState} from 'react';
import {AdventuresStatistics} from "../../../Helpers/Types";
import {get} from "../../../Server/Requests";

function Statistics() {
    const [stats, setStats] = useState<AdventuresStatistics>({trips:0, visitedCountries:0})
    useEffect(()=>{
        get("statistics/").then(result=>setStats(result))
    },[])
    return (
        <>
            <h2>Статистика</h2>
            {/*<h4>Из учтённого</h4>*/}
            <p>Всего путешествий: <span>   </span>{stats.trips}</p>
        </>
    );
}

export default Statistics;