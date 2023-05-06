import React, {useRef} from 'react';
import {City, Country, Sight, Souvenir, Trip} from "../../../Helpers/DataTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import EditEntry from "../../Fragments/EditEntry";
import {post} from "../../../Server/Requests";
import {useNavigate} from "react-router-dom";
import EditCountryModal from "./EditCountryModal";
import useFetch from "../../../Hooks/useFetch";
import SmartWaiter from "../../../Helpers/SmartWaiter";
import Loading from "../Loading";
import SouvenirRow from "./SouvenirRow";
import SightRow from "./SightRow";
import TripBlock from "../GroupedTrips/TripBlock";


function CountryPage({country, onChange} : {country:Country, onChange:()=>void}) {
    const navigate = useNavigate();
    let editRef = useRef<HTMLButtonElement>(null)
    const [sights, loadSights] = useFetch<Sight[]>("sights/for_country/"+country.country);
    const [souvenirs, loadSouvenirs] = useFetch<Souvenir[]>("souvenirs/for_country/"+country.country);
    const [cities, loadingCities] = useFetch<City[]>("cities/for_country/"+country.country)
    const [trips, loadingTrips] = useFetch<Trip[]>("trips/for_country/"+country.country)

    const souvenirList=souvenirs?souvenirs.map(s=>
        <SouvenirRow s={s} key={s.souvenir_id}/>
    ):[]

    const sightList=sights?sights.map(s=>
        <SightRow s={s} key={s.sight_id}/>
    ):[]
    function deleteCountry(){
        if(window.confirm("Вы собираетесь удалить все данные, связанные с "+country.country+". Продолжить?")){
            post("countries/delete/", country.country).then(()=>{
                onChange()
                navigate(-1)
            })
        }
    }
    return (
        <>
            <TitleSubtitle title={country.country}/>
            <EditCountryModal country={country} openRef={editRef} onChange={onChange}/>
            <div className="side-margins">
                <EditEntry onEdit={() => {}} onDelete={deleteCountry} editRef={editRef}/>
            </div>
            <div className="two-columns even">
                <div className="flow-down">
                    <section>
                        <h2>Сувениры</h2>
                        <SmartWaiter
                             timesUp={!loadSouvenirs}>
                            {(souvenirs) ?
                                 <table>
                                    <tbody>
                                    <tr>
                                        <th>Название</th>
                                        <th>Город</th>
                                        <th>Тип</th>
                                        <th>Материал</th>
                                    </tr>
                                    {souvenirList}
                                    </tbody>
                                </table>:<p>Пусто</p>}
                            <Loading/>
                        </SmartWaiter>
                    </section>
                    <section>
                        <h2>Поездки</h2>
                        <SmartWaiter timesUp={!loadingTrips}>
                            <>
                            <div className="flex-grid outline">
                                {trips&&(trips.length>0)?
                                    trips.map(t=>
                                    <TripBlock trip={t} key={t.trip_id}/>):<p>Пусто...</p>}
                            </div>
                            <p>У других не добавлены остановки.</p>
                            </>
                            <Loading object={"путешествия"}/>
                        </SmartWaiter>
                    </section>
                </div>
                <div className="flow-down">
                    <section>
                        <h2>Достопримечательности</h2>
                        <SmartWaiter
                            timesUp={!loadSights}>
                            {(souvenirs) ?
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>Название</th>
                                        <th>Город</th>
                                        <th>Тип</th>
                                        <th>Год</th>
                                    </tr>
                                    {sightList}
                                    </tbody>
                                </table>:<p>Пусто</p>}
                            <Loading/>
                        </SmartWaiter>
                    </section>
                    <section>
                        <h2>Города</h2>
                        <SmartWaiter timesUp={!loadingCities}>
                            {cities&&(cities.length>0)?<div className="flex-grid outline">
                                {cities.map(c=>
                                <button data-selected="0" onClick={()=>navigate("/cities/"+c.city)} key={c.city}>
                                    {c.city}
                                </button> )}
                            </div>:<p>Пусто...</p>}
                            <Loading object={"города"}/>
                        </SmartWaiter>
                    </section>
                </div>
            </div>
        </>
    );
}

export default CountryPage;