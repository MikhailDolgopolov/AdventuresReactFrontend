import {MyData} from "./Types";
export default function (obj:MyData) {
    let o:MyData = {};
    for(let i in obj){
        o[i] = obj[i]; // make the quotes
    }
    return JSON.stringify(o);
}