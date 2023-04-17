import * as React from 'react';

import {BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from "./Components/./Pages/Home";
import GroupedTrips from "./Components/./Pages/GroupedTrips/GroupedTrips";
import Trips from "./Components/./Pages/TripPage/Trips";
import EmptyRoute from "./Components/./Pages/EmptyRoute";
import '././Styles/my_style.css'

import StaticData from "./Components/./Pages/./Database/StaticData";
import People from "./Components/./Pages/People/People";
import Countries from "./Components/./Pages/Countries/Countries";
import Points from "./Components/./Pages/TripPoint/Points";
import useMyData from "./Hooks/useMyData";
import Cities from "./Components/Pages/Cities/Cities";



function App() {
    const myData=useMyData()

    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home data={myData}/>}/>
                    <Route path='trips/*' element={<GroupedTrips data={myData}/>}/>
                    <Route path='trip/*' element={<Trips data={myData}/>}/>
                    <Route path='people/*' element={<People array={myData.people}/>}/>
                    <Route path='countries/*' element={<Countries/>}/>
                    <Route path='cities/*' element={<Cities/>}/>
                    <Route path='trippoints/*' element={<Points data={myData}/>}/>
                    <Route path='data/*' element={<StaticData data={myData}/>}/>
                    <Route path="*" element={<EmptyRoute/>}/>
                </Routes>
            </Router>

        </div>
    );
}

export default App;


