import React, {useEffect, useState} from 'react';
import TitleSubtitle from "../Fragments/TitleSubtitle";
import Loading from "../Fragments/Loading";

function EmptyRoute({waiting}:{waiting?:string}) {
    const [wait, setWaiting] = useState<boolean>(true)
    useEffect(() => {
        setTimeout(() => setWaiting(false), 2500)
    }, [])

    return <>
        {(waiting && wait)?<Loading object={waiting}/>:
            <TitleSubtitle title={"Page not found"} subtitle={"Sorry, such page does not seem to exist..."}/>}
    </>

}



export default EmptyRoute;