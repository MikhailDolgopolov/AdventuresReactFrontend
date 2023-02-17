import * as React from 'react';;

import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from "./Components/pages/Home";
import GroupedTrips from "./Components/pages/GroupedTrips";
import Trips from "./Components/pages/Trips";
import EmptyRoute from "./Components/pages/EmptyRoute";
import {serverProperties} from "./Server/ServerProperties";
import './css/my_style.css'
import * as http from "http";
import {useEffect, useState} from "react";
import ConnectionProblems from "./Components/pages/ConnectionProblems";

export type Connection = {
    connection: boolean
    message: string
}

function App() {
    const [state, setState] = useState<Connection>({connection: false, message: "Not connected"});
    useEffect(() => {
        let timeout=30;
        if(state.connection)  timeout=60;
        const interval = setInterval(() => {
            pingServer(setState);
        }, timeout*1000);
        return () => clearInterval(interval);

    })
    if(!state.connection) return <ConnectionProblems props={state}/>
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

export const getRequest = async (uri: string) => {
    let url = serverProperties.domain + uri;
    const response = await fetch(url);
    return await response.json();
}

export function pingServer(call: { (value: React.SetStateAction<Connection>): void}){
    http.get(serverProperties.domain, (res)=>{
        call({connection: true, message: "connected"})
    }).on('error', function (e) {
        let err = {connection: false, message:e.message};
        call(err)
        console.log(err)
    })
}
