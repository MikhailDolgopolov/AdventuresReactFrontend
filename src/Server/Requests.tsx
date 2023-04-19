import {serverProperties}  from "./ServerProperties";
import * as React from "react";



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

