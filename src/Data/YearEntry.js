import React, {useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import TripBlock from "./TripBlock";

function YearEntry({data}) {
    const navigate = useNavigate();
    let navigateTrip=(trip_id)=>{
        navigate('trips/'+trip_id);
    };
    function tripPath(trip){
        let path = 'trips/'+trip.trip_id;
        console.log(trip);
        return path;
    }
    useEffect(()=>{navigate('/trips/')},[])
    let trips=data.yearList.map(trip=>
        <Route key={trip} path={trip.trip_id} element=
            {<TripBlock trip={trip} onClick={navigateTrip(trip.trip_id)}/>}/>

    )
    return (
        <Routes className="grid">
            {trips}
        </Routes>
    );
}

export default YearEntry;