import YearSplitTrips from "../GroupedTrips/YearSplitTrips";
import React, {useRef} from 'react';
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AddTripModal from "./AddTripModal";
import useSwitch from "../../../Hooks/useSwitch";
import {Trip} from "../../../Helpers/DataTypes";
import useFetch from "../../../Hooks/useFetch";
import {useNavigate} from "react-router-dom";



export default function GroupedTrips() {
    const [flag, changeFlag] = useSwitch()
    let addTripButton = useRef<HTMLButtonElement>(null)
    const navigate=useNavigate()
    return (
        <>
            <TitleSubtitle title={'Путешествия'}/>
            <AddTripModal openRef={addTripButton} onAdd={(t)=>{changeFlag();navigate("/trip/"+t.trip_id)}}/>
            <div className="side-margins">
               <div className="top-row">
                    <div className="right">
                        <button ref={addTripButton} className="big center-child square">
                            <FontAwesomeIcon icon={faPlus} size="2x"/>
                        </button>
                    </div>
                </div>
                <YearSplitTrips tripsChanged={flag}/>
            </div>
        </>
    );
}

