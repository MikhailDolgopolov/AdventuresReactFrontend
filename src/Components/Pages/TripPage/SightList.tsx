import {Sight, Souvenir} from "../../../Helpers/DataTypes";
import React from "react";

function SightList({sights}:{sights:Sight[]}) {
    const allSights = sights.map(s=>
        <div className="flex-block full highlight" key={s.sight_id}>
        <p>{s.name}</p>
        </div>
)
    return (
        <>{(allSights.length>0)&&<div className="flex-grid outline">
            {allSights}
            </div>}</>
    );
}
export default SightList;