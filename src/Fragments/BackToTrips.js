import React from 'react';
import {useNavigate} from 'react-router-dom';

function BackToTrips(props) {
    let navigate=useNavigate();
    return (
        <div>
            <button onClick={()=>navigate("/trips/")}>К путешествиям</button>
        </div>
    );
}

export default BackToTrips;