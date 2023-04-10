import React from 'react';
import {Souvenir} from "../../../Helpers/DataTypes";

function SouvenirList({souvenirs}:{souvenirs:Souvenir[]}) {
    const allSouvenirs = souvenirs.map(s=>
        <div className="flex-block full highlight" key={s.souvenir_id}>
            <p>{s.name}</p>
        </div>
    )
    return (
        <>{(allSouvenirs.length>0)&&<div className="flex-grid outline">
            {allSouvenirs}
        </div>}</>
    );
}

export default SouvenirList;