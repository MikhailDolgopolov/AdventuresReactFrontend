import * as React from 'react';

import {BrowserRouter as Router, Routes, Route, json}
    from 'react-router-dom';
import {createContext, useContext} from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import { library } from '@fortawesome/fontawesome-svg-core'
import { far} from '@fortawesome/free-regular-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

import {serverProperties} from "./Server/ServerProperties";
import './css/my_style.css'
import * as http from "http";
import ConnectionProblems from "./Components/pages/ConnectionProblems";
import {IApiError, Person, SharedData} from "./Types";
import Home from "./Components/pages/Home";
import GroupedTrips from "./Components/pages/GroupedTrips/GroupedTrips";
import Trips from "./Components/pages/Trips";
import EmptyRoute from "./Components/pages/EmptyRoute";
import Loading from "./Components/Fragments/Loading";




const queryClient = new QueryClient()
function App() {
    const { isLoading, isError, error }= useMyQuery("connection", getRequest("") )
    if(isError) return <ConnectionProblems props={error.message}/>
    if(isLoading) return <Loading object={""}/>
    const {data:people} = useQuery<Person[]>("people", ()=>getRequest("people/"))
    return (
        <div className="App" id="root">
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path='/' element={<Home/>}/>
                        <Route path='trips' element={<GroupedTrips people={people}/>}/>
                        <Route path='trip/*' element={<Trips/>}/>
                        <Route path="*" element={<EmptyRoute/>}/>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </div>
    );
}

export default App;
export function useMyQuery<Type>(key:string, query:Promise<Response>){
    return useQuery(
        {queryKey: key, queryFn:()=>query, onError: (err: IApiError) => err})
}
export const getRequest = async (uri: string) => {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(serverProperties.root+uri, requestOptions);

}
export async function get(uri:string){
    return getRequest(uri).then(result=>result.json())
}
export const postRequest = async (uri:string, json:string)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json
    };
    return fetch(serverProperties.root+uri, requestOptions);
}
export async function post(uri:string, json:string){
    return postRequest(uri, json).then(result=>result.json())
}
