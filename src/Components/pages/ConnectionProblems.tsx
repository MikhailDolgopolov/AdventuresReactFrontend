import React from 'react';
import {Connection} from "../../Types";
import TitleSubtitle from "../Fragments/TitleSubtitle";

function ConnectionProblems({props}:{props:Connection}) {
    return (
        <div>
            <TitleSubtitle title={"Server problems"}/>
            <section className="side-margins">
                <b>Something went wrong on the server side</b>
                <p>Not much is known, but {props.message}</p>
            </section>
        </div>
    );
}

export default ConnectionProblems;