import React, {useRef} from 'react';
import "../../.././Styles/DataStyles.css"
import {MyData} from "../../../Helpers/HelperTypes";
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

function StaticData({data}:{data:MyData}) {
    if(data.loading) return <LoadingError loadingObject={"данные"} loading={true} wholePage={true}/>

    const countryTable = data.countries!.map(
        country=><CountryRow key={country.country} prop={country}/>)
    const cityTable=data.cities!.map(city=>
        <CityRow key={city.city} prop={city}/>)
    const personTable=data.people!.map(
        person=><PersonRow key={person.person_id} prop={person}/>
    )
    const addCountryRef = useRef(null)
    const addCityRef = useRef(null)
    const addPersonRef = useRef(null)
    return (<>
        <TitleSubtitle title={"База данных"}/>
        <AddCountryModal onAdd={()=>{}} addCountryButton={addCountryRef}/>
        <AddCityModal onAdd={()=>{}} addCityButton={addCityRef}/>
        <AddPersonModal onAdd={()=>{}} addPersonButton={addPersonRef}/>
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
                   <Statistics/>
                </section>
            </div>
        </div>
        </>);
}

export default StaticData;