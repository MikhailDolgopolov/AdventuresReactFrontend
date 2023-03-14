import React from 'react';
import {MyData} from "../../../Helpers/Types";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import CityRow from "./Rows/CityRow";
import CountryRow from "./Rows/CountryRow";
import PersonRow from "./Rows/PersonRow";
import Statistics from "./Statistics";
import LoadingError from "../LoadingError";

function StaticData({data}:{data:MyData}) {
    if(data.loading || data.error) return <LoadingError loadingObject={"stats"}/>

    const countryTable = data.countries!.map(
        country=><CountryRow key={country.country} prop={country}/>)
    const cityTable=data.cities!.map(city=>
        <CityRow key={city.city} prop={city}/>)
    const personTable=data.people!.map(
        person=><PersonRow key={person.person_id} prop={person}/>
    )
    return (<>
        <TitleSubtitle title={"База данных"}/>
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

                            {countryTable}</tbody>
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