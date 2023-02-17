import React from 'react';
import {Connection} from "../../App";

function ConnectionProblems({props}:{props:Connection}) {
    return (
        <div>
            <h1>Our deepest condolences</h1>
            <b>Something went wrong on the server side</b>
            <p>Not much is known, but {props.message}</p>
        </div>
    );
}

export default ConnectionProblems;