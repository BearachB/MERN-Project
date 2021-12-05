// Inspiration taken from https://dev.to/abbeyperini/toggle-dark-mode-in-react-28c9
import React, { useEffect, useState } from 'react';
import '../bootstrap.min.css';
import { setTheme } from './Themes';

function Toggle() {
    const [togClass, setTogClass] = useState('dark');
    // saves theme to localstorage
    let theme = localStorage.getItem('theme');

    // On click, change theme
    const handleOnClick = () => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-light');
            setTogClass('light')
        } else {
            setTheme('theme-dark');
            setTogClass('dark')
        }
    }

    // UseEffect function for changing theme 
    useEffect(() => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTogClass('dark')
        } else if (localStorage.getItem('theme') === 'theme-light') {
            setTogClass('light')
        }
    }, [theme])

    return (
        <div className="container--toggle">
            {
                // Display "Light Theme", or "Dark Theme" depending on whihc is selected
                togClass === "light" ?
                <input type="submit" value="Dark Theme" id="toggle" className="toggle--checkbox" onClick={handleOnClick} checked />
                :
                <input type="submit" value="Light Theme" id="toggle" className="toggle--checkbox" onClick={handleOnClick} />

            }
            <label htmlFor="toggle" className="toggle--label">
                <span className="toggle--label-background"></span>
            </label>
        </div>
    )
}

export default Toggle