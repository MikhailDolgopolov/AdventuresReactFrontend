import React, {useRef} from 'react';
import {TripPoint} from "../../../Helpers/Types";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";
import Modal from "../../Modal";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {post} from "../../../Server/Requests";
import {useNavigate} from "react-router-dom";

function TripPointPage({point}:{point:TripPoint}) {
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
                <Modal header="Изменить" openRef={editRef}>
                    <form className="vert-window">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi architecto assumenda
                        consectetur cum deleniti doloremque eaque eius eos expedita, ipsam omnis placeat quia quod
                        repellat temporibus ullam unde ut?
                    </form>
                </Modal>
                {point.trip_order}
            </div>
        </>
    );
}

export default TripPointPage;