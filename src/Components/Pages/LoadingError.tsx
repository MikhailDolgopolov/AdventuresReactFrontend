import React from 'react';
import Loading from "./Loading";
import SmartWaiter from "../../Helpers/SmartWaiter";

function LoadingError({loadingObject, loading, wholePage}:{loadingObject:string, loading:boolean, wholePage?:boolean}) {
    return <SmartWaiter timesUp={loading}>
        <Loading object={loadingObject} wholePage={wholePage}/>
        <>
            {wholePage?<h1>Ошибка загрузки</h1>:<h2>Ошибка загрузки</h2>}
            <div className="side-margins"><p>Не получилось загрузить {loadingObject}</p></div>
        </>
    </SmartWaiter>;
}

export default LoadingError;