import React, {useRef} from 'react';
import {Sight} from "../../../../Helpers/DataTypes";
import SightModal from "../../Sights/SightModal";
import {useNavigate} from "react-router-dom";

function SightRow({s}:{s:Sight}) {
    const openWindowRef=useRef<HTMLTableRowElement>(null)
    const navigate=useNavigate()
    return (
        <>
            <SightModal s={s} openRef={openWindowRef}/>
            <tr ref={openWindowRef}>
                <td>{s.name}</td>
                <td>{s.city}</td>
                <td>{s.type}</td>
                <td>{s.created_year}</td>
            </tr>
        </>

    );
}

export default SightRow;