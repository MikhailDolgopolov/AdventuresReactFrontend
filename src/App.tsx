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
import ConnectionProblems from "./Components/pages/ConnectionProblems";

export type Connection = {
    connected: boolean
    message: string
}

function App() {
    const [state, setState] = useState<Connection>({connected: false, message: "Not connected"});
    useEffect(() => {
        pingServer(setState);
        let timeout=20;
        if(state.connected)  timeout=60;
        const interval = setInterval(() => {
            pingServer(setState);
        }, timeout*1000);
        return () => clearInterval(interval);

    }, [])
    if(!state.connected) return <ConnectionProblems props={state}/>
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
    let url = serverProperties.root + uri;
    const response = await fetch(url);
    return await response.json();
}
export const postRequest = (uri:string, json:string)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json
    };
    return fetch(serverProperties.root+uri, requestOptions)
        .then(response => response.json())
}

export function pingServer(call: { (value: React.SetStateAction<Connection>): void}){
    http.get(serverProperties.root, (res)=>{
        call({connected: true, message: "connected"})
    }).on('error', function (e) {
        let err:Connection = {connected: false, message:e.message};
        call(err)
    })
}
