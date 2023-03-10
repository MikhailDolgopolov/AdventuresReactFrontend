import React from 'react';
import {City} from "../../../../Helpers/Types";
function CityRow({prop}:{prop:City}) {
    return (
        <tr>
            <td>{prop.city}</td>
            <td>{prop.country}</td>
            <td>{prop.population}</td>
            <td>{prop.founded_year}</td>
        </tr>
    );
}

export default CityRow;