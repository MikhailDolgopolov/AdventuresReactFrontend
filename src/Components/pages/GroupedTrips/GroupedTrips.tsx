import YearSplitTrips from "../GroupedTrips/YearSplitTrips";
import React, {useEffect,useState} from 'react';
import {post} from "../../../App";
import {Entry, Person, getName, Trip} from "../../../Types";
import Loading from "../../Fragments/Loading";
import TitleSubtitle from "../../Fragments/TitleSubtitle";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";



export default function GroupedTrips({people, allTrips}:{people:Person[], allTrips:Trip[]}) {
    let [trips, setTrips]=useState<Entry[]>([])

    let [filter, setFilter]=useState<number>(0)
    let options: JSX.Element[];
    const [addingTrip, setBool] = useState<boolean>(false);
    const {register, handleSubmit} = useForm<Trip>();
    const onSubmit = handleSubmit((data)=>{
        let seek = allTrips.find(trip=>(data.title==trip.title));
        if(seek){
            alert("Taкое путешествие уже добавлено.");
            setBool(true)
        }else{
            post('trips/create/', JSON.stringify(data)).then(()=>{
                setBool(false);
            });
        }
    })
    useEffect(()=>{
        post('trips/filter/', filter.toString()).then(result=> {
                setTrips(result)
            }
        );
    }, [filter, addingTrip]);

    if(!trips || !people) return <Loading object={"trips"}/>

    options=people.map(person=>
        <option key={person.person_id} value={person.person_id}>
            {getName(person)}</option> )

    const selectTag=<div>
        Показать путешествия для<span>       </span>
        <select onChange={(event)=>
            setFilter(parseInt(event.target.value))
        }>
            <option value={0} onClick={()=>setFilter(0)}>всех</option>
            {options}
        </select>
    </div>
    const AddTrip=
    (addingTrip)?
        <form className="vert-window" onSubmit={onSubmit}>
            <div className="window-header">
                <button onClick={()=>setBool(!addingTrip)}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                <h3>Новое путешествие</h3>
            </div>
            <div className="form-row">
                <label >Название: </label>
                <input  required={true} {...register("title")}/>
            </div>
            <div className="form-row">
                <label >Начало: </label>
                <input required={true} {...register("start_date")}/>
            </div>
            <div className="form-row">
                <label >Окончание: </label>
                <input {...register("end_date")}/>
            </div>
            <div className="form-row">
                <label >Описание: </label>
                <input {...register("description")}/>
            </div>
            <input {...register("trip_id")} value={0} hidden={true}/>
            <input {...register("photo_link")} value={""} hidden={true}/>
            <button type="submit">Добавить</button>
        </form>
        :
        <button onClick={()=>setBool(!addingTrip)}>Добавить</button>

    return (
        <>
            <TitleSubtitle title={'Путешествия'} subtitle={''}/>
            <div className="side-margins">
                <div className="top-row">
                    <div className="empty right">
                        {(filter == 0) && AddTrip}
                    </div>
                    <div className="empty left down">
                        {selectTag}
                    </div>
                </div>
                <YearSplitTrips props={trips}/>
            </div>
        </>
    );
}

