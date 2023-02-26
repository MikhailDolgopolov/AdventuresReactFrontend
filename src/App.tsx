import * as React from 'react';

import {BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

import Home from "./Components/pages/Home";
import GroupedTrips from "./Components/pages/GroupedTrips/GroupedTrips";
import Trips from "./Components/pages/Trips";
import EmptyRoute from "./Components/pages/EmptyRoute";
import {get, post, getRequest, postRequest, pingServer} from "./Server/Requests";
import './css/my_style.css'
import JSONify from "./JSON";
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
        //pingServer(setState);
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


