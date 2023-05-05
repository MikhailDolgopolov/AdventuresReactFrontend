import React from 'react';

function OptionalFormRow({label, value, number}:{label:string, value?:string, number?:number}) {
    return (<>{(number!=0 && number!=undefined || value)&&
        <div className="form-row">
            <label>{label}</label>
            <p>{value}{number}</p>
        </div>}</>
    );
}

export default OptionalFormRow;