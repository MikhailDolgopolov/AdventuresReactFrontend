import React from "react";
import {useNavigate} from "react-router-dom";
import TitleSubtitle from "../Fragments/TitleSubtitle";

const Home=()=> {
    let navigate=useNavigate();
    return (
        <>
            <TitleSubtitle title={"Главная страница"} home={true}/>
            <div className="vert-margins side-margins">

                <button className="big side-margins" onClick={() => navigate('/trips/')}>
                    Все путешествия
                </button>
                <button className="big side-margins" onClick={() => navigate('/data/')}>
                        База данных
                </button>
            </div>
        </>
    );
}

export default Home;