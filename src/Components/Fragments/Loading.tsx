import React from "react";
import TitleSubtitle from "./TitleSubtitle";

function Loading({object}:{object:string}) {
    return (
        <>
            <TitleSubtitle title={"Loading "+object}/>
            <div className="side-margins vert-margins"><p>Waiting for {(object) ? object : "content"}</p></div>
        </>
    );
}

export default Loading;