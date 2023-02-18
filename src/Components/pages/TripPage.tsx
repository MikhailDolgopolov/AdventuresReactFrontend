import React from "react";
import BackToTrips from "../Fragments/BackToTrips";
import Loading from "../Fragments/Loading";
import {postRequest} from "../../App";
import {useNavigate} from "react-router-dom";
import {Trip} from "../../Types";

function TripPage({trip}:{trip:Trip}) {
    if(!trip) return <Loading object='trips'/>
    const navigate = useNavigate();
    function confirmDeletion(){
        if(confirm("Вы собираетесь удалить все данные, связанные с "+trip.title+". Продолжить?")){
            postRequest("trips/delete/", trip.trip_id.toString())
                .then(()=>navigate("/trips/"));

        }
    }
    return (
        <div>
            <h1>{trip.title}</h1>
            <div className="spread-row up reverse">
                <div>

                    <p>{trip.start_date} - {trip.end_date}</p>
                    {trip.description !== null && <p>{trip.description}</p>}

                    <BackToTrips/>
                </div>
                <div className="right-flex">
                    <button onClick={()=>{confirmDeletion()}}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default TripPage;