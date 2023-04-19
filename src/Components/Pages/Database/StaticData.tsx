import React, {useRef} from 'react';
import "../../.././Styles/DataStyles.css"
import {AdventuresStatistics} from "../../../Helpers/HelperTypes";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import LoadingError from "../LoadingError";
import CityRow from "./Rows/CityRow";
import CountryRow from "./Rows/CountryRow";
import PersonRow from "./Rows/PersonRow";
import AddCountryModal from "./AddCountryModal";
import AddCityModal from "./AddCityModal";
import Statistics from "./Statistics";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AddPersonModal from "./AddPersonModal";
import useFetch from "../../../Hooks/useFetch";
import useSwitch from "../../../Hooks/useSwitch";

function StaticData() {
    const [refetch, flip] = useSwitch()
    const [stats, loadingStats] = useFetch<AdventuresStatistics>("statistics/", refetch)

    const addCountryRef = useRef(null)
    const addCityRef = useRef(null)
    const addPersonRef = useRef(null)
    if(!stats) return <LoadingError loadingObject={"данные"} loading={loadingStats} wholePage={true}/>
    const countryTable = stats.countries.map(
        country=><CountryRow key={country.country} prop={country}/>)
    const cityTable=stats.cities.map(city=>
        <CityRow key={city.city} prop={city}/>)
    const personTable=stats.people.map(
        person=><PersonRow key={person.person_id} prop={person}/>
    )

    return (<>
        <TitleSubtitle title={"База данных"}/>
        <AddCountryModal onAdd={()=>{flip()}} addCountryButton={addCountryRef}/>
        <AddCityModal onAdd={()=>{flip()}} addCityButton={addCityRef}/>
        <AddPersonModal onAdd={()=>{flip()}} addPersonButton={addPersonRef}/>
        <div className="two-columns side-margins contains-tables">
            <div className="flow-down">
                <section>
                    <h2>Страны</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Название</th>
                                <th>Население</th>
                                <th>Площадь, млн км<sup>2</sup></th>
                                <th>Столица</th>
                            </tr>
                            <tr className="hoverable button">
                                <td colSpan={4} ref={addCountryRef}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </td>
                            </tr>
                            {countryTable}
                        </tbody>
                    </table>
                </section>
                <section>
                    <h2>Города</h2>
                    <table>
                        <tbody>
                        <tr>
                            <th>Название</th>
                            <th>Страна</th>
                            <th>Население</th>
                            <th>Год основания</th>
                        </tr>
                        <tr className="hoverable button">
                            <td colSpan={4} ref={addCityRef}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </td>
                        </tr>
                        {cityTable}
                        </tbody>
                    </table>

                </section>
            </div>
            <div className="flow-down">
                <section>
                    <h2>Люди</h2>
                    <table>
                        <tbody>
                        <tr>
                            <th>Сокращение</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                        </tr>
                        <tr className="hoverable button">
                            <td colSpan={4} ref={addPersonRef}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </td>
                        </tr>
                        {personTable}
                        </tbody>
                    </table>
                </section>
                <section>
                   <Statistics data={stats} loading={loadingStats}/>
                </section>
            </div>
        </div>
        </>);
}

export default StaticData;