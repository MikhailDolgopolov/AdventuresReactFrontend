import React from 'react';
import {serverProperties} from "../../Server/ServerProperties";
import TitleSubtitle from "../Fragments/TitleSubtitle";

function ConnectionProblems({loading, error, showHomeButton}:{loading:boolean,error:Error|null, showHomeButton?:boolean}) {
    if(loading) return <TitleSubtitle title={"Подождите..."} showHomeButton={showHomeButton}/>
    return (
        <div>
            <TitleSubtitle title={"Server problems"} showHomeButton={showHomeButton}/>
            <section className="side-margins vert-margins">
                <b>Something went wrong on the server side</b>
                {(error)?
                    <p>Wait for the server to work again. For now any responses to <a>{serverProperties.root}</a> return  <span>   </span>
                        <i>{error.message}</i></p>:
                    <p>No information</p>
                }

            </section>
        </div>
    );
}

export default ConnectionProblems;