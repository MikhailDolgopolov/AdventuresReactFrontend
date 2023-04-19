import React, {useRef} from 'react';
import {City, Trip, TripPoint} from "../../../Helpers/DataTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";
import {post} from "../../../Server/Requests";
import {useNavigate} from "react-router-dom";
import EditTripPointModal from "./EditTripPointModal";
import TrippointSouvenirs from "./TrippointSouvenirs";
import useFetch from "../../../Hooks/useFetch";
import LoadingError from "../LoadingError";
import TrippointSights from "./TrippointSights";

function TripPointPage({point, cities, onChange}:{point:TripPoint, cities:City[], onChange:()=>void}) {
    const [trip, loadingTrip] = useFetch<Trip>("trips/"+point.trip_id)
    const editRef = useRef<HTMLButtonElement>(null);
    let navigate=useNavigate()
    if(!trip || !cities) return <LoadingError loadingObject={point.title} loading={loadingTrip} wholePage={true}/>
    function confirmDeletion() {
        if (confirm("Вы собираетесь удалить все данные, связанные с " + point.title + ". Продолжить?")) {
            post("trippoints/delete/", point.trippoint_id.toString(),true)
                .then(() => navigate("/trip/"+point.trip_id));
        }
    }
    return (
        <>
            <TitleSubtitle title={point.title} subtitle={point.city}/>
            <div className="side-margins">
                <EditEntry onEdit={() => {}} onDelete={confirmDeletion} editRef={editRef}/>
                <EditTripPointModal point={point} setPoint={res=>{
                    point=res
                    onChange();
                }} editRef={editRef} cities={cities}/>

                <div className="two-columns">
                    <div className="flow-down">
                        <TrippointSouvenirs point={point}/>
                    </div>
                    <div className="flow-down">
                        <TrippointSights point={point}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TripPointPage;