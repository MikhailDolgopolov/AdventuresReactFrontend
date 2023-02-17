import React from "react";
import BackToTrips from "../Fragments/BackToTrips";
import Loading from "../Fragments/Loading";
export type Trip ={
    trip_id : number
    title : string
    start_date : string
    end_date : string
    description : string
    photo_link : string
}
function TripPage(trip:Trip) {
    if(!trip) return <Loading object='trips'/>
    return (
        <div>
            <h1>{trip.title}</h1>
            <p>{trip.start_date} - {trip.end_date}</p>
            {trip.description !== null &&
                <p>{trip.description}</p>}

            <BackToTrips/>
        </div>
    );
}

export default TripPage;