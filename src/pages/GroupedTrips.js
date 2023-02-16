import YearSplitTrips from "../Data/YearSplitTrips";
import React, {useEffect,useState} from 'react';
import {getRequest} from "../App";


export default function GroupedTrips() {
    let [data, setTrips]=useState([])
    useEffect(()=>{
        document.title = "Все путешествия";
        getRequest('trips/json/').then(result=>setTrips(result.list));
    },[]);
    return (
        <div>
            <h1>Trips</h1>
            <YearSplitTrips className="side_margins" json={data}/>
        </div>
    );
}

