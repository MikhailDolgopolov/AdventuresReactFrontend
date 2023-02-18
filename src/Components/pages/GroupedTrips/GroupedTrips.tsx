import YearSplitTrips from "../GroupedTrips/YearSplitTrips";
import React, {useEffect,useState} from 'react';
import {getRequest, postRequest} from "../../../App";
import {Entry, Person} from "../../../Types";
import Loading from "../../Fragments/Loading";



export default function GroupedTrips() {
    let [trips, setTrips]=useState<Entry[]>([])
    let [people, setPeople]=useState<Person[]>([]);
    let [filter, setFilter]=useState<number>(0)
    let options: JSX.Element[];
    useEffect(()=>{
        document.title = "Все путешествия";
        getRequest("people/").then(result=>{
            setPeople(result)
        });
    },[]);
    useEffect(()=>{
        postRequest('trips/filter/', filter.toString()).then(result=>
            setTrips(result)
        );
    }, [filter]);

    if(!trips || !people) return <Loading object={"trips"}/>
    function getName(person:Person):string{
        if(person.alias) return person.alias;
        return person.first_name+" "+person.last_name;
    }
    options=people.map(person=>
        <option key={person.person_id} value={person.person_id}>
            {getName(person)}</option> )

    const selectTag=<div>
        Показать путешествия для<span>   </span>
        <select onChange={(event)=>
            setFilter(parseInt(event.target.value))
        }>
            <option className="default-option" value={0} onClick={()=>setFilter(0)}>--Все--</option>
            {options}
        </select>
    </div>
    return (
        <div>
            <h1>Trips</h1>
            {selectTag}
            <YearSplitTrips props={trips}/>
        </div>
    );
}

