import YearSplitTrips from "../Data/YearSplitTrips";
import React, {useEffect,useState} from 'react';

export function AllTrips({trips}) {

    const [showTrips, setTrips]=useState()
    let data;
    // async function getTrips(){
    //     let url = "http://localhost:8080/trips/json";
    //     let response = await fetch(url);
    //     data = await response.json();
    //     console.log(data);
    //
    // }
    // useEffect(()=>{
    //         getTrips()
    //     },
    // [])
    return (
        <div>
            <h1>Trips</h1>
            <YearSplitTrips json={data}/>
        </div>
    );
}
export  default async function WaitTrips(){
    let url = "http://localhost:8080/trips/json/";
    let req = Object.assign(
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        }
    );
    let response = await fetch(url, req);
    let json = await response.json();
    console.log(json)
    return {trips:{json}}
}

