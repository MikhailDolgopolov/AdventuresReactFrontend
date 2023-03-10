import React from 'react';
import {Connection} from "../../Helpers/Types";
import TitleSubtitle from "../Fragments/TitleSubtitle";

function ConnectionProblems({connection, home}:{connection:Connection, home?:boolean}) {
    if(connection.message=="Starting up") return <TitleSubtitle title={"Подождите..."} home={true}/>
    return (
        <div>
            <TitleSubtitle title={"Server problems"} home={home}/>
            <section className="side-margins vert-margins">
                <b>Something went wrong on the server side</b>
                <p>Wait for the server to work again. For now any responses return  <span>   </span>
                    <i>{connection.message}</i></p>
            </section>
        </div>
    );
}

export default ConnectionProblems;