import React from 'react';
import {Country} from "../../../../Helpers/DataTypes";
import {useNavigate} from "react-router-dom";

function CountryRow({prop}:{prop:Country}) {
    let navigate = useNavigate()
    return (
        <tr className="hoverable" onClick={()=>navigate("/countries/"+prop.country)}>
            <td>{prop.country}</td>
            <td>{prop.population}</td>
            <td>{prop.area}</td>
            <td>{prop.capital_city}</td>
        </tr>
    );
}

export default CountryRow;