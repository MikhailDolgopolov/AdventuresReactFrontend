import React from 'react';

function Date({d1, d2}:{d1:string, d2:string}) {
    return (
        <p><span className="date">{d1}</span>{d2&&<><span> - </span><span className="date">{d2}</span></>} </p>
    );
}

export default Date;