import React from "react";
import TitleSubtitle from "../Fragments/TitleSubtitle";

const Home=()=> {
    return (
        <div>
            <TitleSubtitle title={"Главная страница"} subtitle={""}/>
            <div className="vert-margins">
                <form method="get" action="../trips/">
                    <button>Все путешествия</button>
                </form>
            </div>
        </div>
    );
}

export default Home;