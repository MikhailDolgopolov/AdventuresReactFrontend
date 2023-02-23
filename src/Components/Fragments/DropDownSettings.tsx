import React from 'react';
import ThemeButton from "./ThemeButton";

function DropDownSettings() {
    return (
        <select>
            <option key="0"></option>
            <option key="1">
                <ThemeButton/>
            </option>
        </select>
    );
}

export default DropDownSettings;