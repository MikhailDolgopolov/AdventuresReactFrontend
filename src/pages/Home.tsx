import React from "react";

const Home=()=> {
    return (
        <div>
            <h1>Главная страница</h1>
            <div className="vert-margins">
                <form method="get" action="../trips/">
                    <button>Все путешествия</button>
                </form>
            </div>
        </div>
    );
}

export default Home;