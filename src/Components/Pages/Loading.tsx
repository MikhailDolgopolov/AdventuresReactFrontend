import React, {useEffect, useState} from "react";
import TitleSubtitle from "../Fragments/TitleSubtitle";

function Loading({object, wholePage}:{object?:string, wholePage?:boolean}) {

    return (
        <>
            {wholePage?<h1>Загружаем {object}</h1> : <h2> Загружаем {object}</h2>}

            <span>Пытаемся загрузить {object&&<span> {object}</span>}</span>

        </>
    );
}

export default Loading;