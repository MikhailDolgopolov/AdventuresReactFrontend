import {SightVisitCombined, TripPoint} from "../../../../Helpers/DataTypes";
import React from "react";
import SightBlock from "./SightBlock";

function SightList({sights, onChange, trippoints}:{sights:SightVisitCombined[], onChange:()=>any, trippoints:TripPoint[]}) {
    const allSights = sights.map(s=>
        <SightBlock s={s} key={s.sight_id} onChange={onChange} trippoints={trippoints}/>
)
    return (
        <>{(allSights.length>0)&&<div className="flex-grid outline">
            {allSights}
        </div>}
        </>
    );
}
export default SightList;