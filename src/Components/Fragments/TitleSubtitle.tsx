import React, {useEffect, useState} from 'react';

import ThemeButton from "./ThemeButton";
import NavigateHome from "./NavigateHome"

function TitleSubtitle({title, subtitle, hideHomeButton}:{title:string, subtitle?:string, hideHomeButton?:boolean}) {
    useEffect(()=>{
        document.title=title;
    }, [])
    return (
        <div className="full-title">
            {hideHomeButton?<div></div>:<NavigateHome/>}
            <div className="title">
                <h1>{title}</h1>
                {(subtitle) && <h4>{subtitle}</h4>}
            </div>
            <ThemeButton/>
        </div>
    );
}

export default TitleSubtitle;