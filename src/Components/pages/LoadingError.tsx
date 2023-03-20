import React from 'react';
import Waiter from "../../Helpers/Waiter";
import TitleSubtitle from "../Fragments/TitleSubtitle";
import Loading from "./Loading";

function LoadingError({loadingObject}:{loadingObject:string}) {
    return <Waiter delay={3}>
        <Loading object={loadingObject}/>
        <>
            <h1>Ошибка загрузки</h1>
            <p>Не получилось загрузить {loadingObject}</p>
        </>
    </Waiter>;
}

export default LoadingError;