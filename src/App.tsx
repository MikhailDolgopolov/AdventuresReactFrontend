import * as React from 'react';

import {BrowserRouter as Router, Routes, Route, json}
    from 'react-router-dom';
import {createContext, useContext} from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { far} from '@fortawesome/free-regular-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

import Home from "./Components/pages/Home";
import GroupedTrips from "./Components/pages/GroupedTrips/GroupedTrips";
import Trips from "./Components/pages/Trips";
import EmptyRoute from "./Components/pages/EmptyRoute";
import {serverProperties} from "./Server/ServerProperties";
import './css/my_style.css'
import * as http from "http";
import {useEffect, useState} from "react";
import ConnectionProblems from "./Components/pages/ConnectionProblems";
import {Connection, Person, SharedData} from "./Types";


export const MyContext = createContext<SharedData>({allPeople:[]});
function App() {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };
    const [state, setState] = useState<Connection>({connected: false, message: "Not connected"});
    let [people, setPeople]=useState<Person[]>([]);
    useEffect(() => {
        pingServer(setState);
        let timeout=20;
        if(state.connected)  timeout=60;
        getRequest("people/").then(result=>{
            setPeople(result)
        });
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
                        <Route path='trips' element={<GroupedTrips people={people}/>}/>
                        <Route path='trip/*' element={<Trips people={people}/>} />
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
    try{
        return await response.json();
    }catch (e){
        return await new Response(undefined).json();
    }

}
export const postRequest = async (uri:string, json:string)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json
    };
    try{
        return fetch(serverProperties.root+uri, requestOptions)
            .then(response => response.json())
    }catch (e){
        return await new Response(undefined).json();
    }

}

export function pingServer(call: { (value: React.SetStateAction<Connection>): void}){
    http.get(serverProperties.root, (res)=>{
        call({connected: true, message: "connected"})
    }).on('error', function (e) {
        let err:Connection = {connected: false, message:e.message};
        call(err)
    })
}
