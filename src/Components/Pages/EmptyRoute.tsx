import React from 'react';
import TitleSubtitle from "../Fragments/TitleSubtitle";
import Loading from "./Loading";
import Waiter from "../../Helpers/Waiter";

function EmptyRoute({waiting}:{waiting?:string}) {
    return <Waiter delay={2.5}>
        <Loading object={waiting} wholePage={true}/>
        <TitleSubtitle title={"Страница не существует"} subtitle={"Похоже, такой страницы не существует..."}/>
    </Waiter>
}

export default EmptyRoute;