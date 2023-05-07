import React from 'react';
import {AdventuresStatistics} from "../../../Helpers/HelperTypes";
import LoadingError from "../LoadingError";

function Statistics({data, loading}:{data?:AdventuresStatistics, loading:boolean}) {

    if(!data) return <LoadingError loadingObject="статистику" loading={loading}/>
    return (
        <>
            <h2>Статистика</h2>
            {/*<h4>Из учтённого</h4>*/}
            <p>Всего путешествий: <span>   </span>{data.numberOfTrips}</p>
            <p>Всего сувениров: <span>   </span>{data.numberOfSouvenirs}</p>
        </>
    );
}

export default Statistics;