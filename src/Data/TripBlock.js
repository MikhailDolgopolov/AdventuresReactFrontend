import React from 'react';

function TripBlock({trip}) {
    console.log(trip)
    return (
        <div className="grid-block">
            <button className="grid-button">
                <h3>{trip.title}</h3>
                <p>{trip.start_date} - {trip.end_date}</p>
                {trip.description !== null &&
                <p>{trip.description}</p>}
            </button>
        </div>
    );
}

export default TripBlock;