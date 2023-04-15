import React from 'react';
import {Souvenir, TripPoint} from "../../../../Helpers/DataTypes";
import SouvenirBlock from "./SouvenirBlock";

function SouvenirList({souvenirs, trippoints, onChange}:{souvenirs:Souvenir[], trippoints:TripPoint[], onChange:()=>void}) {

    const allSouvenirs = souvenirs.map(s=>
        <SouvenirBlock s={s} key={s.souvenir_id} onChange={onChange} trippoints={trippoints}/>
    )
    return (
        <>
            {(allSouvenirs.length>0)&&<div className="flex-grid outline">
            {allSouvenirs}
        </div>}</>
    );
}

export default SouvenirList;