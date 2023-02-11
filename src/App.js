import './css/my_style.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from "./pages/Home";
import AllTrips from "./pages/AllTrips";

function App() {
    function getHtml(){
        let html = fetch("http://localhost:8080/home/");
        console.log(html);
    }
  return (
    <div className="App" id="root">
        <Router>
            <Routes>
                <Route element={<Home/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path='/trips/' element={<AllTrips/>}/>
            </Routes>
        </Router>

    </div>
  );
}

export default App;
