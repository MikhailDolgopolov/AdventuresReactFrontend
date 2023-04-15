import React, {useEffect, useRef, useState} from 'react';
import {City, Sight, SightVisit, SightVisitCombined, Trip, TripPoint} from "../../../../Helpers/DataTypes";
import useFetch from "../../../../Hooks/useFetch";
import LoadingError from "../../LoadingError";
import SightList from "./SightList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../Fragments/Modal";
import ButtonSelect from "../../../Fragments/ButtonSelect";
import {useForm} from "react-hook-form";
import SearchInput from "../../../Fragments/SearchInput";
import {MyData} from "../../../../Helpers/HelperTypes";
import moment from 'moment'
import {post} from "../../../../Server/Requests";
import useSwitch from "../../../../Hooks/useSwitch";
import AddSightModal from "./AddSightModal";


function SightsSection({trip, data, points}:{trip:Trip, data:MyData, points:TripPoint[]}) {



    const [closeAdder, close] = useSwitch()
    const [sights, loadingSights] = useFetch<SightVisitCombined[]>("sights/for_trip/"+trip.trip_id, closeAdder)

    const addSightRef = useRef(null)


    if(!sights) return <LoadingError loadingObject={"достопримечательности"} loading={loadingSights}/>
    return (
        <section>
            <h2>Достопримечательности</h2>
            <AddSightModal addSightRef={addSightRef} closeSwitch={closeAdder} data={data} points={points} trip_id={trip.trip_id}/>
            <SightList sights={sights} onChange={close} trippoints={points}/>
            <div className="row edges">
                <button className="big" ref={addSightRef}>
                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                </button>
            </div>
        </section>
    );
}

export default SightsSection;