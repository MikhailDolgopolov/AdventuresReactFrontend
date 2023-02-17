import YearSplitTrips from "../Data/YearSplitTrips";
import React, {useEffect,useState} from 'react';
import {getRequest} from "../App";
import {Entry} from "../Data/YearEntry";
import Loading from "../Fragments/Loading";


export default function GroupedTrips() {
    let [data, setTrips]=useState<Entry[]>([])
    useEffect(()=>{
        document.title = "Все путешествия";
        getRequest('trips/json/').then(result=>{
            setTrips(result)
        });
    },[]);
    if(!data) return <Loading/>

    return (
        <div>
            <h1>Trips</h1>
            <YearSplitTrips props={data}/>
        </div>
    );
}

