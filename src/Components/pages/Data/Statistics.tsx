import React, {useEffect, useState} from 'react';
import {AdventuresStatistics} from "../../../Helpers/Types";
import useFetch from "../../../Hooks/useFetch";
import LoadingError from "../LoadingError";

function Statistics() {
    const [stats, loadingStats, errorStats] = useFetch<AdventuresStatistics>("statistics")
    if(!stats) return <LoadingError loadingObject="статистику"/>
    return (
        <>
            <h2>Статистика</h2>
            {/*<h4>Из учтённого</h4>*/}
            <p>Всего путешествий: <span>   </span>{stats.trips}</p>
        </>
    );
}

export default Statistics;