import React from "react";

function Loading({object, wholePage}:{object?:string, wholePage?:boolean}) {
    if(!object) object="";
    return (
        <>
            {wholePage?<h1>{"Загрузка "+object}</h1> : <h2> Загрузка {object}</h2>}

            <div className="side-margins"><p>{object && <span>Пытаемся загрузить {object}</span>}</p></div>

        </>
    );
}

export default Loading;