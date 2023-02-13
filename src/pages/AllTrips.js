import YearSplitTrips from "../Data/YearSplitTrips";
import React, {useEffect,useState} from 'react';

export default function AllTrips() {
    //document.title = "Все путешествия";
    let [data, setTrips]=useState([
        {year:2023, yearList:[{title:'Test'}]},
        {year:2022, yearList:[{title:'Test2'}]},
    ])
    async function getTrips(){
        let url = "http://localhost:8080/trips/json/";
        let response = await fetch(url);
        data = await response.json();
        data=data.list;
        setTrips(data);
        console.log(data);
    }
    useEffect(()=>{
        getTrips()
    },[])
    return (
        <div>
            <h1>Trips</h1>
            <YearSplitTrips className="side_margins" json={data}/>
        </div>
    );
}

