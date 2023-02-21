import YearSplitTrips from "../GroupedTrips/YearSplitTrips";
import React, {useEffect,useState, useContext} from 'react';
import {getRequest, postRequest, MyContext} from "../../../App";
import {Entry, Person, getName, SharedData} from "../../../Types";
import Loading from "../../Fragments/Loading";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import AddTrip from "./AddTrip";



export default function GroupedTrips({people}:{people:Person[]}) {
    let [trips, setTrips]=useState<Entry[]>([])

    let [filter, setFilter]=useState<number>(0)
    let options: JSX.Element[];
    useEffect(()=>{
        postRequest('trips/filter/', filter.toString()).then(result=>
            setTrips(result)
        );
    }, [filter]);

    if(!trips || !people) return <Loading object={"trips"}/>

    options=people.map(person=>
        <option key={person.person_id} value={person.person_id}>
            {getName(person)}</option> )

    const selectTag=<div>
        Показать путешествия для<span>   </span>
        <select onChange={(event)=>
            setFilter(parseInt(event.target.value))
        }>
            <option value={0} onClick={()=>setFilter(0)}>--Все--</option>
            {options}
        </select>
    </div>
    return (
        <>
            <TitleSubtitle title={'Путешествия'} subtitle={''}/>
            <div className="side-margins">
                <div className="spread-row down">
                    {selectTag}
                    {(filter==0)&&<AddTrip/>}
                </div>
                <YearSplitTrips props={trips}/>
            </div>
        </>
    );
}

