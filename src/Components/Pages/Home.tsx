import React from "react";
import {useNavigate} from "react-router-dom";
import TitleSubtitle from "../Fragments/TitleSubtitle";
import LoadingError from "./LoadingError";
import useFetch from "../../Hooks/useFetch";

function Home() {
    let navigate=useNavigate();
    const [result,load]=useFetch("")
    if (!result) return <LoadingError loading={load} loadingObject={"приложение"} wholePage={true}/>

    return (
        <>
            <TitleSubtitle title={"Главная страница"} hideHomeButton={true}/>
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