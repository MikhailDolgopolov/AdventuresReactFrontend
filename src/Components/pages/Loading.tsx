import React, {useEffect, useState} from "react";
import TitleSubtitle from "../Fragments/TitleSubtitle";

function Loading({object}:{object?:string}) {
    const [counter, setCounter] = useState<number>(0)
    useEffect(()=>{
        setInterval(()=>{setCounter((counter+1)%4)}, 500)
    },[])
    let ellipsis=""
    switch (counter) {
        case 1:
            ellipsis="."
            break
        case 2:
            ellipsis=".."
            break
        case 3:
            ellipsis="..."
            break
    }

    return (
        <>
            <TitleSubtitle title={"Loading "+object+ellipsis}/>
            <div className="side-margins vert-margins">
                <span>Waiting {object&&<span> for {object}</span>}</span><span>{ellipsis}</span>
                </div>
        </>
    );
}

export default Loading;