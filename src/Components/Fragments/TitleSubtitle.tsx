import React, {useEffect, useState} from 'react';

import ThemeButton from "./ThemeButton";
import NavigateHome from "./NavigateHome"

function TitleSubtitle({title, subtitle}:{title:string, subtitle?:string}) {
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
            <NavigateHome/>
            <div className="title">
                <h1>{title}</h1>
                {(subtitle) && <h4>{subtitle}</h4>}
            </div>
            <ThemeButton/>
        </div>
    );
}

export default TitleSubtitle;