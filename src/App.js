import './css/my_style.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from "./pages/Home";
import GroupedTrips from "./pages/GroupedTrips";
import Trips from "./pages/Trips";
import EmptyRoute from "./EmptyRoute";
import {serverProperties} from "./Server/ServerProperties";

function App() {

  return (
    <div className="App" id="root">
        <Router>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path='trips' element={<GroupedTrips/>}/>
                <Route path='trip/*' element={<Trips/>}/>
                <Route path="*" element={<EmptyRoute/>}/>
            </Routes>
        </Router>

    </div>
  );
}

export default App;

export const getRequest = async (uri) => {
    let url = serverProperties.domain+uri;
    const response = await fetch(url);
    return response.json();
}
