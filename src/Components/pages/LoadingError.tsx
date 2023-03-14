import React from 'react';
import Waiter from "../../Helpers/Waiter";
import TitleSubtitle from "../Fragments/TitleSubtitle";
import Loading from "./Loading";

function LoadingError({loadingObject}:{loadingObject:string}) {
    return <Waiter delay={3}>
        <Loading object={loadingObject}/>
        <>
            <TitleSubtitle title={"Ошибка загрузки"}/>
            <p>Не получилосб загрузить {loadingObject}</p>
        </>
    </Waiter>;
}

export default LoadingError;