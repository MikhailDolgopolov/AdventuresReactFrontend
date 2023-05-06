import {City, SightVisitCombined, TripPoint} from "../../../../Helpers/DataTypes";
import React from "react";
import SightVisitBlock from "./SightVisitBlock";
import useFetch from "../../../../Hooks/useFetch";
import useSwitch from "../../../../Hooks/useSwitch";

function SightVisitList({sights, onChange}:{sights:SightVisitCombined[], onChange:()=>any, trippoints:TripPoint[]}) {
    const allSights = sights.map(s=>
        <SightVisitBlock s={s} key={s.sight_id} onChange={()=>{
            onChange()
        }}/>
    )
    return (
        <>{(allSights.length>0)&&<div className="flex-grid outline">
            {allSights}
        </div>}
        </>
    );
}
export default SightVisitList;