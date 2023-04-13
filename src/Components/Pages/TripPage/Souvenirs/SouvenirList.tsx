import React, {useRef, useState} from 'react';
import {Souvenir} from "../../../../Helpers/DataTypes";
import SouvenirBlock from "./SouvenirBlock";

function SouvenirList({souvenirs, onChange}:{souvenirs:Souvenir[], onChange:()=>void}) {

    const allSouvenirs = souvenirs.map(s=>
        <SouvenirBlock s={s} key={s.souvenir_id} onChange={onChange}/>
    )
    return (
        <>
            {(allSouvenirs.length>0)&&<div className="flex-grid outline">
            {allSouvenirs}
        </div>}</>
    );
}

export default SouvenirList;