import React, {useEffect, useState} from 'react';
import {Person} from "../../../Types";
import {getRequest} from "../../../App";

function PersonFilter() {
    let [people, setPeople]=useState<Person[]>();
    let options;
    function filter(){

    }
    function getName(person:Person):string{
        if(person.alias) return person.alias;
        return person.first_name+" "+person.last_name;
    }
    useEffect(()=>{
        getRequest("people/").then(result=>{
            setPeople(result)
        })
    },[])
    if(people){
        options=people.map(person=>
        <option key={person.person_id} id={person.person_id.toString()}>{getName(person)}</option> )
    }
    return (
        <div>
            Показать путешествия для
            <select onSelect={()=>filter()}>
                <option className="default-option">--Все--</option>
                {options}
            </select>
        </div>
    );
}

export default PersonFilter;