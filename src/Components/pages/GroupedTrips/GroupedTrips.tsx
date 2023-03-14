import YearSplitTrips from "../GroupedTrips/YearSplitTrips";
import React, {useEffect, useRef, useState} from 'react';
import {post} from "../../../Server/Requests";
import {Entry, getName, MyData} from "../../../Helpers/Types";
import Loading from "../Loading";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AddTripModal from "./AddTripModal";



export default function GroupedTrips({data}:{data:MyData}) {
    const [filter, setFilter] = useState<number>(0)
    let options: JSX.Element[];
    let [trips, setTrips]=useState<Entry[]>([])

    useEffect(()=>{
        post('trips/filter/', filter.toString()).then(result=> {
                setTrips(result)
            }
        );
    }, [filter]);

    if(data.loading) return <Loading object={"trip"}/>

    options=data.people?data.people.map(person=>
        <option key={person.person_id} value={person.person_id}>
            {getName(person)}</option> ):[]

    const selectTag=<div>
        Показать путешествия для<span>       </span>
        <select className="no-border hoverable" onChange={(event)=>
            setFilter(parseInt(event.target.value))
        }>
            <option value={0} onClick={()=>setFilter(0)}>всех</option>
            {options}
        </select>
    </div>
    let addTripButton = useRef<HTMLButtonElement>(null)

    return (
        <>
            <TitleSubtitle title={'Путешествия'} subtitle={''}/>
            <AddTripModal allTrips={data.trips} addTripButton={addTripButton} onAdd={()=>data.refetchFunctions.trips()}/>
            <div className="side-margins">
                <div className="top-row">
                    <div className="empty right">
                        {(filter == 0) && <button ref={addTripButton} className="big center-child square">
                            <FontAwesomeIcon icon={faPlus} size="lg"/>
                        </button>}
                    </div>
                    <div className="empty left down">
                        {selectTag}
                    </div>
                </div>
                <YearSplitTrips entries={trips}/>
            </div>
        </>
    );
}

