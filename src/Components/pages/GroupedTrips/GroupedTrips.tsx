import YearSplitTrips from "../GroupedTrips/YearSplitTrips";
import React, {useEffect, useRef, useState} from 'react';
import {post} from "../../../Server/Requests";
import {Entry, Person, getName, Trip} from "../../../Helpers/Types";
import Loading from "../../Fragments/Loading";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Modal";
import AddTripModal from "./AddTripModal";



export default function GroupedTrips({people, allTrips}:{people:Person[], allTrips:Trip[]}) {
    let [trips, setTrips]=useState<Entry[]>([])

    let [filter, setFilter]=useState<number>(0)
    let options: JSX.Element[];
    const [boolSwitch, rerender] = useState<boolean>(false);

    useEffect(()=>{
        post('trips/filter/', filter.toString()).then(result=> {
                setTrips(result)
            }
        );
    }, [filter, boolSwitch]);

    if(!trips || !people) return <Loading object={"trip"}/>

    options=people.map(person=>
        <option key={person.person_id} value={person.person_id}>
            {getName(person)}</option> )

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
            <AddTripModal allTrips={allTrips} addTripButton={addTripButton} onAdd={()=>rerender(!boolSwitch)}/>
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

