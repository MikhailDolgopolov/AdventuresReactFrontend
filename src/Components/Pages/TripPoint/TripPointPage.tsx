import React, {useRef} from 'react';
import {City, Trip, TripPoint} from "../../../Helpers/DataTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";
import {post} from "../../../././Server/Requests";
import {useNavigate} from "react-router-dom";
import EditTripPointModal from "./EditTripPointModal";
import TrippointSouvenirs from "./TrippointSouvenirs";
import useFetch from "../../../Hooks/useFetch";
import LoadingError from "../LoadingError";
import useLogger from "../../../Hooks/useLogger";
import useSwitch from "../../../Hooks/useSwitch";
import {MyData} from "../../../Helpers/HelperTypes";

function TripPointPage({point, data}:{point:TripPoint, data:MyData}) {
    const [trip, loadingTrip] = useFetch<Trip>("trips/get/"+point.trip_id)
    const editRef = useRef<HTMLButtonElement>(null);
    let navigate=useNavigate()
    if(!trip || !data.cities) return <LoadingError loadingObject={point.title} loading={loadingTrip} wholePage={true}/>
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
                    data.functions.points();
                }} editRef={editRef} cities={data.cities}/>

                <div className="two-columns">
                    <TrippointSouvenirs trip={trip} point={point}/>
                </div>
            </div>
        </>
    );
}

export default TripPointPage;