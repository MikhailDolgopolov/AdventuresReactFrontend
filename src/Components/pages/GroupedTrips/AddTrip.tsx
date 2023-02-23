import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

function AddTrip() {
    const [addingTrip, setBool] = useState<boolean>(false);
    return (
        <>
            {(addingTrip)?
                <form className="window">
                    <div className="window-header">
                        <button onClick={()=>setBool(!addingTrip)}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                        <h2>Новое путешествие</h2>
                    </div>
                    <div className="spread-row">
                        <label >Название: </label>
                        <input/>
                    </div>
                    <div className="spread-row">
                        <label >Начало: </label>
                        <input/>
                    </div>
                    <div className="spread-row">
                        <label >Окончание: </label>
                        <input/>
                    </div>
                    <div className="spread-row">
                        <label >Описание: </label>
                        <input/>
                    </div>

                </form>
                :
                <button onClick={()=>setBool(!addingTrip)}>Добавить</button>
                }
        </>
    );
}

export default AddTrip;