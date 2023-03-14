import React, {useRef} from 'react';
import {City, TripPoint} from "../../../Helpers/Types";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";
import {post} from "../../../Server/Requests";
import {useNavigate} from "react-router-dom";
import EditTripPointModal from "./EditTripPointModal";

function TripPointPage({point, cities}:{point:TripPoint, cities:City[]}) {
    let editRef = useRef<HTMLButtonElement>(null);
    let navigate=useNavigate()
    function confirmDeletion() {
        if (confirm("Вы собираетесь удалить все данные, связанные с " + point.title + ". Продолжить?")) {
            post("trippoints/delete/", point.trip_point_id.toString(),true)
                .then(() => navigate("/trip/"+point.trip_id));

        }
    }
    return (
        <>
            <TitleSubtitle title={point.title} subtitle={point.city}/>
            <div className="side-margins">
                <EditEntry onEdit={() => {}} onDelete={confirmDeletion} editRef={editRef}/>
                <EditTripPointModal point={point} setPoint={res=>point=res} editRef={editRef} cities={cities}/>
            </div>
        </>
    );
}

export default TripPointPage;