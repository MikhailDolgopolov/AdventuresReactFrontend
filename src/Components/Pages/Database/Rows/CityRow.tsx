import React from 'react';
import {City} from "../../../../Helpers/DataTypes";
import {useNavigate} from "react-router-dom";
function CityRow({prop}:{prop:City}) {
    const navigate = useNavigate();
    return (
        <tr className="hoverable" onClick={()=>navigate("/cities/"+prop.city)}>
            <td>{prop.city}</td>
            <td>{prop.country}</td>
            <td>{prop.population!=0&&prop.population}</td>
            <td>{prop.founded_year!=0&&prop.founded_year}</td>
        </tr>
    );
}

export default CityRow;