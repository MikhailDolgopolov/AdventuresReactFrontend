import * as React from 'react';

import {BrowserRouter as Router, Routes, Route, json}
    from 'react-router-dom';

import Home from "./Components/pages/Home";
import GroupedTrips from "./Components/pages/GroupedTrips/GroupedTrips";
import Trips from "./Components/pages/Trips";
import EmptyRoute from "./Components/pages/EmptyRoute";
import {serverProperties} from "./Server/ServerProperties";
import './css/my_style.css'
import * as http from "http";
import {useEffect, useState} from "react";
import {City, Connection, Person, Country, Trip} from "./Types";



function App() {

    const [state, setState] = useState<Connection>({connected: false, message: "Not connected"});
    let [people, setPeople]=useState<Person[]>([]);
    let [trips, setTrips] = useState<Trip[]>([]);
    let [cities, setCities] = useState<City[]>([]);
    let [countries, setCountries] = useState<Country[]>([])
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        pingServer(setState);
        let timeout=20;
        if(state.connected)  timeout=60;
        get("people/").then(result=>{
            setPeople(result)
        });
        get('trips/list/').then(t=>
            setTrips(t));
        get('cities/').then(result=>{
            setCities(result)
        })
        get('countries/').then(result=>
            setCountries(result))
        const interval = setInterval(() => {
            pingServer(setState);
        }, timeout*1000);
        return () => clearInterval(interval);

    }, [])
    //if(!state.connected) return <ConnectionProblems props={state}/>
    return (
        <div className={`App ${theme}`} id="root">
            <Router>
                <Routes>
                        <Route index element={<Home/>}/>
                        <Route path='/' element={<Home/>}/>
                        <Route path='trips/*' element={<GroupedTrips people={people} allTrips={trips}/>}/>
                        <Route path='trip/*' element={<Trips people={people} cities={cities} countries={countries}/>} />
                        <Route path="*" element={<EmptyRoute/>}/>
                </Routes>
            </Router>

        </div>
    );
}

export default App;

export const getRequest = async (uri: string) => {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(serverProperties.root+uri, requestOptions);

}
export async function get(uri:string, noResponse?:boolean){
    if(noResponse){
        return getRequest(uri).then(()=>{});
    }
    return getRequest(uri).then(result=>result.json());
}
export const postRequest = async (uri:string, json:string)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json
    };
    return fetch(serverProperties.root+uri, requestOptions);
}
export async function post(uri:string, json:string, noResponse?:boolean){
    if(noResponse){
        return postRequest(uri, json).then(()=>{});
    }
    return postRequest(uri, json).then(result=>result.json());
}

export function pingServer(call: { (value: React.SetStateAction<Connection>): void}){
    http.get(serverProperties.root, ()=>{
        call({connected: true, message: "connected"})
    }).on('error', function (e) {
        let err:Connection = {connected: false, message:e.message};
        call(err)
    })
}
