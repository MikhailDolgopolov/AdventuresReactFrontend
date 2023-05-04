import React, {useRef} from 'react';
import SouvenirModal from "../Souvenirs/SouvenirModal";
import {Souvenir} from "../../../Helpers/DataTypes";

function SouvenirRow({s}:{s:Souvenir}) {
    const openWindowRef=useRef<HTMLTableRowElement>(null)
    return (
        <>
            <SouvenirModal s={s} openRef={openWindowRef}/>
            <tr key={s.souvenir_id} ref={openWindowRef}>
                <td>{s.name}</td>
                <td>{s.city}</td>
                <td>{s.type}</td>
                <td>{s.material}</td>
            </tr>
        </>);
}
export default SouvenirRow;