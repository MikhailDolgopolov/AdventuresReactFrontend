import {serverProperties} from "./ServerProperties";
import * as React from "react";
import {Connection} from "../Types";
import http from "http";

export const getRequest = async (uri: string) => {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(serverProperties.root+uri, requestOptions);

}
export async function get(uri:string, noResponse?:boolean){
    if(noResponse){
        return getRequest(uri).then(()=>{});
    }
    return getRequest(uri).then(result=>result.json());
}
export const postRequest = async (uri:string, json:string)=>{
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
    return postRequest(uri, json).then(result=>result.json());
}

export function pingServer(call: { (value: React.SetStateAction<Connection>): void}){
    http.get(serverProperties.root, ()=>{
        call({connected: true, message: "connected"})
    }).on('error', function (e) {
        let err:Connection = {connected: false, message:e.message};
        call(err)
    })
}