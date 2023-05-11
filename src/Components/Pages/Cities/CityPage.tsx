import React, {useRef} from 'react';
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import {City, Sight, Souvenir} from "../../../Helpers/DataTypes";
import EditEntry from "../../Fragments/EditEntry";
import {post} from "../../../Server/Requests";
import {useNavigate} from "react-router-dom";
import EditCityModal from "./EditCityModal";
import useFetch from "../../../Hooks/useFetch";
import SouvenirBlock from "../Trips/Souvenirs/SouvenirBlock";
import SightBlock from "../Sights/SightBlock";
import SmartWaiter from "../../../Helpers/SmartWaiter";
import Loading from "../Loading";
import SouvenirRow from "../Database/Rows/SouvenirRow";
import SightRow from "../Database/Rows/SightRow";

function CityPage({city, onChange}:{city:City, onChange:()=>void}) {
    const navigate=useNavigate()
    let editRef = useRef<HTMLButtonElement>(null)
    const [souvenirs, loadSouvenirs] = useFetch<Souvenir[]>("souvenirs/for_city/"+city.city)
    const [sights, loadSights] = useFetch<Sight[]>("sights/for_city/"+city.city)
    function deleteCity(){
        if(window.confirm("Вы собираетесь удалить все данные, связанные с "+city.city+". Продолжить?")){
            post("cities/delete/", city.city).then(()=>{
                onChange()
                navigate(-1)
            })
        }
    }
    return (
        <>
            <TitleSubtitle title={city.city}/>
            <EditCityModal city={city} openRef={editRef} onChange={onChange}/>
            <div className="side-margins">
                <EditEntry onEdit={()=>{}} onDelete={deleteCity} editRef={editRef}>
                    <button data-selected="0" className="self-left" onClick={()=>navigate("/countries/"+city.country)}>{city.country}</button>
                </EditEntry>
                <div className="two-columns">
                    <div className="flow-down">
                        {souvenirs&&<section>
                            <h2>Сувениры</h2>
                            <SmartWaiter timesUp={!loadSouvenirs}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>Название</th>
                                        <th>Город</th>
                                        <th>Тип</th>
                                        <th>Материал</th>
                                    </tr>
                                    {(souvenirs.length>0) ?
                                        souvenirs.map(s=>
                                            <SouvenirRow s={s} key={s.souvenir_id}/>
                                        ):
                                        <tr><td colSpan={4}><p className="note">Пусто...</p></td></tr>}
                                    </tbody>
                                </table>
                                <Loading/>
                            </SmartWaiter>
                        </section>}
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
                                        </tr>
                                        {sights.map(s=>
                                            <SightRow s={s} key={s.sight_id}/>
                                        )}
                                        {sights.length==0&&<tr><td colSpan={4}><p className="note">Пусто...</p></td></tr>}
                                        </tbody>
                                    </table>:<p className="note">Пусто...</p>}
                                <Loading/>
                            </SmartWaiter>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CityPage;