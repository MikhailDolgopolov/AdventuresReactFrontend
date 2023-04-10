import React, {useEffect, useState} from 'react';

function ThemeButton() {
    const [theme, setTheme] = useState<string>('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    useEffect(() => {
        setTheme(localStorage.getItem('current_theme')!)
    }, []);


    useEffect(() => {
        document.getElementById('root')!.className='App '+theme;
        localStorage.setItem("current_theme", theme)
    }, [theme]);
    return (
        <label className="switch">
            <input onChange={()=>toggleTheme()} type="checkbox" checked={(theme=="light")}/>
            <span className="slider"/>
        </label>
    );
}

export default ThemeButton;