import React, {useRef, useState} from 'react';
import {Souvenir, Trip, TripPoint} from "../../../../Helpers/DataTypes";
import useFetch from "../../../../Hooks/useFetch";
import LoadingError from "../../LoadingError";
import Modal from "../../../Fragments/Modal";
import {useForm} from "react-hook-form";
import MyInput from "../../../../Helpers/MyInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import SouvenirList from "./SouvenirList";
import AddSouvenirModal from "./AddSouvenirModal";

function SouvenirsSection({trip, points}:{trip:Trip, points:TripPoint[]}) {
    const [souvenirs, loadingSouvenirs] = useFetch<Souvenir[]>("souvenirs/for_trip/"+trip.trip_id)
    const addSouvenirRef = useRef(null)

    if(!souvenirs) return <></>

    return (
        <section>
            <h2>Сувениры</h2>
            <AddSouvenirModal trip={trip} points={points} openRef={addSouvenirRef}/>

           <SouvenirList souvenirs={souvenirs}/>
            <div className="row edges">
                <button className="big" ref={addSouvenirRef}>
                    <FontAwesomeIcon icon={faPlus} size="2x"/>
                </button>
            </div>
        </section>
    );
}

export default SouvenirsSection;