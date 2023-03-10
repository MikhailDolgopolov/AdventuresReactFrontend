import {useNavigate} from "react-router-dom";
import React from "react";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome} from "@fortawesome/free-solid-svg-icons";

function NavigateHome() {
    let navigate=useNavigate();
    return (
        <button className="inline center-child" onClick={()=>navigate("/")}>
            <FontAwesomeIcon icon={faHome} size="lg"/>
        </button>
    );
}
export default NavigateHome;