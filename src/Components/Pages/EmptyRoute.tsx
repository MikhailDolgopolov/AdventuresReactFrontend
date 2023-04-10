import React from 'react';
import TitleSubtitle from "../Fragments/TitleSubtitle";
import Loading from "./Loading";
import Waiter from "../../Helpers/Waiter";

function EmptyRoute({waiting}:{waiting?:string}) {
    return <Waiter delay={2.5}>
        <Loading object={waiting}/>
        <TitleSubtitle title={"Page not found"} subtitle={"Sorry, such page does not seem to exist..."}/>
    </Waiter>
}

export default EmptyRoute;