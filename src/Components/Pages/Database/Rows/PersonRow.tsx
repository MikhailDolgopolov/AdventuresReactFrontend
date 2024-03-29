import React from 'react';
import {Person} from "../../../../Helpers/DataTypes";
import {useNavigate} from "react-router-dom";

function PersonRow({prop}:{prop:Person}) {
    let navigate = useNavigate()
    return (
        <tr className="hoverable" onClick={()=>navigate('/people/'+prop.person_id)}>
            <td>{prop.alias}</td>
            <td>{prop.first_name}</td>
            <td>{prop.last_name}</td>
        </tr>
    );
}

export default PersonRow;