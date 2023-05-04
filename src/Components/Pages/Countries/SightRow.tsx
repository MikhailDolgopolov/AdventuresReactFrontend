import React, {useRef} from 'react';
import {Sight} from "../../../Helpers/DataTypes";
import SightModal from "../Sights/SightModal";

function SightRow({s}:{s:Sight}) {
    const openWindowRef=useRef<HTMLTableRowElement>(null)
    return (
        <>
            <SightModal s={s} openRef={openWindowRef}/>
            <tr>
                <td>{s.name}</td>
                <td>{s.city}</td>
                <td>{s.type}</td>
                <td>{s.created_year}</td>
            </tr>
        </>

    );
}

export default SightRow;