import React, {useEffect, useState} from "react";
import TitleSubtitle from "../Fragments/TitleSubtitle";

function Loading({object}:{object?:string}) {

    return (
        <>
            <h1> Загружаем {object}</h1>

            <span>Пытаемся загрузить {object&&<span> {object}</span>}</span>

        </>
    );
}

export default Loading;