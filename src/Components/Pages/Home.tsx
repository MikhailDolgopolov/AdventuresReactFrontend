import React from "react";
import {useNavigate} from "react-router-dom";
import TitleSubtitle from "../Fragments/TitleSubtitle";
import {MyData} from "../../Helpers/HelperTypes";
import LoadingError from "./LoadingError";
import ConnectionProblems from "./ConnectionProblems";

const Home=({data}:{data:MyData})=> {
    let navigate=useNavigate();
    if (data.loading) return <LoadingError loading={true} loadingObject={"приложение"} wholePage={true}/>
    if(data.error)
        return <ConnectionProblems loading={data.loading} error={data.error} hideHomeButton={true}/>
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