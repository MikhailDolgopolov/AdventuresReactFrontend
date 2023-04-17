import YearSplitTrips from "../GroupedTrips/YearSplitTrips";
import React, {useEffect, useRef, useState} from 'react';
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AddTripModal from "./AddTripModal";
import useSwitch from "../../../Hooks/useSwitch";
import {Country, Trip} from "../../../Helpers/DataTypes";
import useFetch from "../../../Hooks/useFetch";



export default function GroupedTrips() {
    const [flag, changeFlag] = useSwitch()
    const [trips, loading] = useFetch<Trip[]>("trips/", flag)

    let addTripButton = useRef<HTMLButtonElement>(null)

    return (
        <>
            <TitleSubtitle title={'Путешествия'}/>
            <AddTripModal allTrips={trips} addTripButton={addTripButton} onAdd={()=>changeFlag()}/>
            <div className="side-margins">
                {loading&&<div className="top-row">
                    <div className="empty right">
                        <button ref={addTripButton} className="big center-child square">
                            <FontAwesomeIcon icon={faPlus} size="2x"/>
                        </button>
                    </div>
                </div>}
                <YearSplitTrips tripsChanged={flag}/>
            </div>
        </>
    );
}

