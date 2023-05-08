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
import SouvenirRow from "../Database/Rows/SouvenirRow";
import SightRow from "../Database/Rows/SightRow";
import TripBlock from "../GroupedTrips/TripBlock";
import useSwitch from "../../../Hooks/useSwitch";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AddCityModal from "../Database/AddCityModal";


function CountryPage({country, onChange} : {country:Country, onChange:()=>void}) {
    const navigate = useNavigate();
    const [refetch, flip] = useSwitch()
    let editRef = useRef<HTMLButtonElement>(null)
    const addCityRef = useRef<HTMLButtonElement>(null)
    const [capital] = useFetch<City>('countries/capital/'+country.country, refetch)
    const [sights, loadSights] = useFetch<Sight[]>("sights/for_country/"+country.country);
    const [souvenirs, loadSouvenirs] = useFetch<Souvenir[]>("souvenirs/for_country/"+country.country);
    const [cities, loadingCities] = useFetch<City[]>("cities/for_country/"+country.country, refetch)
    const [trips, loadingTrips] = useFetch<Trip[]>("trips/for_country/"+country.country)

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
            {cities&&<EditCountryModal country={country} openRef={editRef} onChange={()=>{flip();onChange()}} cities={cities}/>}
            <div className="side-margins">
                <EditEntry onEdit={flip} onDelete={deleteCountry} editRef={editRef}>
                    {capital&&<button className="self-left" data-selected="0" onClick={()=>navigate("/cities/"+capital.city)}>{capital.city}</button>}
                </EditEntry>
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
                                    {souvenirs.map(s=>
                                        <SouvenirRow s={s} key={s.souvenir_id}/>
                                    )}
                                    {souvenirs.length==0&&<tr><td colSpan={4}><p className="note">Пусто...</p></td></tr>}
                                    </tbody>
                                </table>:<p className="note">Пусто...</p>}
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
                                    <TripBlock trip={t} key={t.trip_id}/>):<p className="note">Пусто...</p>}
                            </div>
                            {trips&&trips.length>0&&<p className="note">У других не добавлены остановки.</p>}
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
                            {(sights) ?
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>Название</th>
                                        <th>Город</th>
                                        <th>Тип</th>
                                        <th>Год</th>
                                    </tr>
                                    {sights.map(s=>
                                        <SightRow s={s} key={s.sight_id}/>
                                    )}
                                    {sights.length==0&&<tr><td colSpan={4}><p className="note">Пусто...</p></td></tr>}
                                    </tbody>
                                </table>:<p className="note">Пусто...</p>}
                            <Loading object={"достопримечательности"}/>
                        </SmartWaiter>
                    </section>
                    <section>
                        <h2>Города</h2>
                        <AddCityModal onAdd={flip} addCityButton={addCityRef} defaultCountry={country.country}/>
                        <SmartWaiter timesUp={!loadingCities}>
                            <>{cities&&(cities.length>0)?<div className="flex-grid outline">
                                {cities.map(c=>
                                <button data-selected="0" onClick={()=>navigate("/cities/"+c.city)} key={c.city}>
                                    {c.city}
                                </button> )}
                            </div>:<p className="note">Пусто...</p>}
                                <div className="row">
                                    <button ref={addCityRef} className="big center-child square">
                                        <FontAwesomeIcon icon={faPlus} size="2x"/>
                                    </button>
                                </div>
                            </>
                            <Loading object={"города"}/>
                        </SmartWaiter>
                    </section>
                </div>
            </div>
        </>
    );
}

export default CountryPage;