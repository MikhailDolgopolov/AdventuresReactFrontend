import React, {useState} from 'react';
import {City, Souvenir, TripPoint} from "../../../../Helpers/DataTypes";
import SouvenirBlock from "./SouvenirBlock";
import useFetch from "../../../../Hooks/useFetch";
import useSwitch from "../../../../Hooks/useSwitch";

function SouvenirList({souvenirs, trippoints, onChange}:{souvenirs:Souvenir[], trippoints:TripPoint[], onChange:()=>void}) {
    const [refetch, flip] = useSwitch()
    const allSouvenirs = souvenirs.map(s=>
        <SouvenirBlock s={s} key={s.souvenir_id}/>
    )
    return (
        <>
            {(allSouvenirs.length>0)&&<div className="flex-grid outline">
            {allSouvenirs}
        </div>}</>
    );
}

export default SouvenirList;