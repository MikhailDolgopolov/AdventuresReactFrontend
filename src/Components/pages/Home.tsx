import React from "react";
import {useNavigate} from "react-router-dom";
import TitleSubtitle from "../Fragments/TitleSubtitle";

const Home=()=> {
    let navigate=useNavigate();
    return (
        <>
            <TitleSubtitle title={"Главная страница"}/>
            <div className="vert-margins side-margins">
                <button onClick={() => navigate('/trips/')}>
                        Все путешествия
                </button>
            </div>
        </>
    );
}

export default Home;