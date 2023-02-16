import React from "react";

function Loading(object) {
    return (
        <div className='placeholder'>
            <p>Waiting for {(object)?object:"content"}</p>
        </div>
    );
}

export default Loading;