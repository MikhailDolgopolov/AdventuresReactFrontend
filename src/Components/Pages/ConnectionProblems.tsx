import React from 'react';
import {serverProperties} from "../../././Server/ServerProperties";
import TitleSubtitle from "../Fragments/TitleSubtitle";

function ConnectionProblems({loading, error, hideHomeButton}:{loading:boolean,error:Error|null, hideHomeButton?:boolean}) {
    if(loading) return <TitleSubtitle title={"Подождите..."} hideHomeButton={hideHomeButton}/>
    return (
        <div>
            <TitleSubtitle title={"Server problems"} hideHomeButton={hideHomeButton}/>
            <div className="side-margins vert-margins">
                <b>Something went wrong on the server side</b>
                {(error)?
                    <p>Wait for the server to work again. For now any responses to <a>{serverProperties.root}</a> return  <span>   </span>
                        <i>{error.message}</i></p>:
                    <p>No information</p>
                }

            </div>
        </div>
    );
}

export default ConnectionProblems;