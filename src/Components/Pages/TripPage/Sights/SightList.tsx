import {Sight, Souvenir} from "../../../../Helpers/DataTypes";
import React from "react";
import SightBlock from "./SightBlock";

function SightList({sights}:{sights:Sight[]}) {
    const allSights = sights.map(s=>
        <SightBlock s={s} key={s.sight_id}/>
)
    return (
        <>{(allSights.length>0)&&<div className="flex-grid outline">
            {allSights}
        </div>}
        </>
    );
}
export default SightList;