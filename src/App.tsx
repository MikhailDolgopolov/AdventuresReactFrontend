import * as React from 'react';

import {BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from "./Components/pages/Home";
import GroupedTrips from "./Components/pages/GroupedTrips/GroupedTrips";
import Trips from "./Components/pages/TripPage/Trips";
import EmptyRoute from "./Components/pages/EmptyRoute";
import './css/my_style.css'
import {useEffect, useState} from "react";
import ConnectionProblems from "./Components/pages/ConnectionProblems";
import StaticData from "./Components/pages/Data/StaticData";
import People from "./Components/pages/People/People";
import Countries from "./Components/pages/Countries/Countries";
import Points from "./Components/pages/TripPoint/Points";
import useMyData from "./Hooks/useMyData";


function App() {
    const myData=useMyData()

    if(myData.loading || myData.error)
        return <ConnectionProblems loading={myData.loading} error={myData.error} hideHomeButton={true}/>
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='trips/*' element={<GroupedTrips data={myData}/>}/>
                    <Route path='trip/*' element={<Trips data={myData}/>}/>
                    <Route path='people/*' element={<People array={myData.people}/>}/>
                    <Route path='countries/*' element={<Countries array={myData.countries}/>}/>
                    <Route path='trippoints/*' element={<Points data={myData}/>}/>
                    <Route path='data/*' element={<StaticData data={myData}/>}/>
                    <Route path="*" element={<EmptyRoute/>}/>
                </Routes>
            </Router>

        </div>
    );
}

export default App;


