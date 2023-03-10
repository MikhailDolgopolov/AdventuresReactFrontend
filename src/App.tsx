import * as React from 'react';

import {BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from "./Components/pages/Home";
import GroupedTrips from "./Components/pages/GroupedTrips/GroupedTrips";
import Trips from "./Components/pages/TripPage/Trips";
import EmptyRoute from "./Components/pages/EmptyRoute";
import {get, pingServer} from "./Server/Requests";
import './css/my_style.css'
import {useEffect, useRef, useState} from "react";
import {City, Connection, Person, Country, Trip, TripPoint} from "./Helpers/Types";
import ConnectionProblems from "./Components/pages/ConnectionProblems";
import StaticData from "./Components/pages/Data/StaticData";
import People from "./Components/pages/People/People";
import Countries from "./Components/pages/Countries/Countries";
import Modal from "./Components/Modal";
import * as path from "path";
import Points from "./Components/pages/TripPoint/Points";



function App() {
    const [state, setState] = useState<Connection>({connected: false, message: "Starting up"});
    let [people, setPeople]=useState<Person[]>([]);
    let [trips, setTrips] = useState<Trip[]>([]);
    let [cities, setCities] = useState<City[]>([]);
    let [countries, setCountries] = useState<Country[]>([])
    let [tripPoints, setTripPoints] = useState<TripPoint[]>([])
    const [theme, setTheme] = useState('dark');
    useEffect(() => {
        pingServer(setState).then(()=>{
            setState({connected:true, message:"success"})}
        ).catch(e=>
            setState({connected:false, message:e.toString()}));


        let timeout=30;

        const interval = setInterval(() => {
            pingServer(setState).then(()=>setState({connected:true, message:"success"})
            ).catch(e=>
                setState({connected:false, message:e.toString()}));
        }, timeout*1000);
        return () => clearInterval(interval);

    }, [])

    useEffect(()=>{
        get("people/").then(result=>{
            setPeople(result)
        }).catch(error=>{
            console.log(error)
        });
        get('trips/list/').then(t=>{
            setTrips(t);
        })

        get('cities/').then(result=>{
            setCities(result)
        })
        get('countries/').then(result=>
            setCountries(result))
        get('trippoints/list/').then(result=>
        setTripPoints(result))
    }, [state])

    if(!state.connected) return <ConnectionProblems connection={state} home={true}/>
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='error/' element={<ConnectionProblems connection={state} home={false}/>}/>
                    <Route path='/' element={<Home/>}/>
                    <Route path='trips/*' element={<GroupedTrips people={people} allTrips={trips}/>}/>
                    <Route path='trip/*' element={<Trips people={people} cities={cities} countries={countries}/>}/>
                    <Route path='people/*' element={<People array={people}/>}/>
                    <Route path='countries/*' element={<Countries array={countries}/>}/>
                    <Route path='trippoints/*' element={<Points array={tripPoints}/>}/>
                    <Route path='data/*' element={<StaticData people={people} cities={cities} countries={countries}/>}/>
                    <Route path="*" element={<EmptyRoute/>}/>
                </Routes>
            </Router>

        </div>
    );
}

export default App;


