import React, {useRef} from 'react';
import {Souvenir, Trip, TripPoint} from "../../../Helpers/DataTypes";
import useFetch from "../../../Hooks/useFetch";
import LoadingError from "../LoadingError";
import Modal from "../../Fragments/Modal";
import {useForm} from "react-hook-form";
import MyInput from "../../../Helpers/MyInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import SouvenirList from "../TripPoint/SouvenirList";
import TripPoints from "./TripPoints";

function SouvenirsSection({trip}:{trip:Trip}) {
    const [souvenirs, loadingSouvenirs, errorSouvenirs, refetch] = useFetch<Souvenir[]>("souvenirs/for_trip/"+trip.trip_id)
    const addSouvenirRef = useRef(null)
    if(!souvenirs) return <LoadingError loadingObject={"сувениры"} loading={loadingSouvenirs}/>

    return (
        <section>
            <h2>Сувениры</h2>
            <Modal header={"Перейдите к остановке"} openRef={addSouvenirRef}>
                <p>Уйдите</p>
            </Modal>
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