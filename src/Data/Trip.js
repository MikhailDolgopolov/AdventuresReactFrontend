import React from 'react';

function Trip({trip}) {
    return (
        <div className="grid-block">
            <button className="grid-button">
                <h3>{trip.title}</h3>
                <p>{trip.start_date} - {trip.end_date}</p>
                {trip.description === undefined &&
                <p>{trip.description}</p>}
            </button>
        </div>
    );
}

export default Trip;