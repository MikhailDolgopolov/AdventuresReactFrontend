import {serverProperties}  from "./ServerProperties";
import * as React from "react";
import {Connection} from "../Helpers/Types";
import http from "http";

export async function getRequest(uri: string):Promise<Response> {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(serverProperties.root+uri, requestOptions);

}
export async function get(uri:string, noResponse?:boolean){
    if(noResponse){
        return getRequest(uri).then(()=>{});
    }
    let response = getRequest(uri);

    return  response.then(res=>res.json()).catch(er=>new Error(er.message))

}
export async function postRequest(uri:string, json:string):Promise<Response>{
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
    let response = postRequest(uri, json);
    return response.then(result=>result.json()).catch(er=>new Error(er.message));
}

export function pingServer(call: { (value: React.SetStateAction<Connection>): void}){
    let result:Connection;
    return getRequest("");

}