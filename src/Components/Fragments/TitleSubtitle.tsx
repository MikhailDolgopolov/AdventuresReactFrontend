import React, {useEffect, useState} from 'react';

import ThemeButton from "./ThemeButton";
import NavigateHome from "./NavigateHome"

function TitleSubtitle({title, subtitle, showHomeButton}:{title:string, subtitle?:string, showHomeButton?:boolean}) {
    const [theme, setTheme] = useState<String>('light');
    return (
        <div className="full-title">
            {showHomeButton?<NavigateHome/>:<div></div>}
            <div className="title">
                <h1>{title}</h1>
                {(subtitle) && <h4>{subtitle}</h4>}
            </div>
            <ThemeButton/>
        </div>
    );
}

export default TitleSubtitle;