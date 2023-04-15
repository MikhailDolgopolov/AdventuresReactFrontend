import YearSplitTrips from "../GroupedTrips/YearSplitTrips";
import React, {useEffect, useRef, useState} from 'react';
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AddTripModal from "./AddTripModal";
import useSwitch from "../../../Hooks/useSwitch";
import {MyData} from "../../../Helpers/HelperTypes";
import ButtonSelect from "../../Fragments/ButtonSelect";
import {Country} from "../../../Helpers/DataTypes";



export default function GroupedTrips({data}:{data:MyData}) {
    const [flag, changeFlag] = useSwitch()
    useEffect(()=>{
        data.functions.trips()
    }, [flag])

    let addTripButton = useRef<HTMLButtonElement>(null)

    return (
        <>
            <TitleSubtitle title={'Путешествия'}/>
            <AddTripModal allTrips={data.trips} addTripButton={addTripButton} onAdd={()=>changeFlag()}/>
            <div className="side-margins">
                <div className="top-row">
                    <div className="empty right">
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

