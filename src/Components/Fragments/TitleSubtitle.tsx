import React, {useEffect, useState} from 'react';

import ThemeButton from "./ThemeButton";
import NavigateHome from "./NavigateHome"

function TitleSubtitle({title, subtitle, home}:{title:string, subtitle?:string, home?:boolean}) {
    const [theme, setTheme] = useState<String>('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    useEffect(() => {
        document.getElementById('root')!.className='App '+theme;
    }, [theme]);
    useEffect(()=>{
        document.title = title;
    }, [])
    return (
        <div className="full-title">
            {home?<div></div>:<NavigateHome/>}
            <div className="title">
                <h1>{title}</h1>
                {(subtitle) && <h4>{subtitle}</h4>}
            </div>
            <ThemeButton/>
        </div>
    );
}

export default TitleSubtitle;