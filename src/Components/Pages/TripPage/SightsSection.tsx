import React, {useRef} from 'react';
import {Sight, Trip} from "../../../Helpers/DataTypes";
import useFetch from "../../../Hooks/useFetch";
import LoadingError from "../LoadingError";
import SightList from "./SightList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Fragments/Modal";

function SightsSection({trip}:{trip:Trip}) {
    const [sights, loadingSights] = useFetch<Sight[]>("sights/for_trip/"+trip.trip_id)
    const addSightRef = useRef(null)
    if(!sights) return <LoadingError loadingObject={"достопримечательности"} loading={loadingSights}/>
    return (
        <section>
            <h2>Достопримечательности</h2>
            <Modal header={"Добавить объект"} openRef={addSightRef}>
                <form>
                    <div className="form-row">
                        <label>Название</label>
                        <input/>
                    </div>
                    <div className="form-row">
                        <label>Город</label>
                        <input/>
                    </div>

                </form>
            </Modal>
            <SightList sights={sights}/>
            <button className="big" ref={addSightRef}>
                <FontAwesomeIcon icon={faPlus} size="2x"/>
            </button>
        </section>
    );
}

export default SightsSection;