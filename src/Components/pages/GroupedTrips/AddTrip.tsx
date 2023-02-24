import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {Trip} from "../../../Types";
import {post} from "../../../App";


function AddTrip() {
    let navigate = useNavigate();
    const [addingTrip, setBool] = useState<boolean>(false);
    const {register, handleSubmit} = useForm<Trip>();
    const onSubmit = handleSubmit((data)=>{
        post('trips/create/', JSON.stringify(data)).then(result=>{
            console.log(result);
            navigate('/')
            navigate('/trips/add')
        });
    })
    return (
        <>
            {(addingTrip)?
                <form className="vert-window" onSubmit={onSubmit}>
                    <div className="window-header">
                        <button onClick={()=>setBool(!addingTrip)}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                        <h3>Новое путешествие</h3>
                    </div>
                    <div className="form-row">
                        <label >Название: </label>
                        <input  required={true} {...register("title")} value={''}/>
                    </div>
                    <div className="form-row">
                        <label >Начало: </label>
                        <input required={true} {...register("start_date")}/>
                    </div>
                    <div className="form-row">
                        <label >Окончание: </label>
                        <input {...register("end_date")} value={undefined}/>
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
                }
        </>
    );
}

export default AddTrip;