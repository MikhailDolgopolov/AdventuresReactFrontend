import React, {useState} from 'react';

function AddTrip() {
    const [addingTrip, setBool] = useState<boolean>(false);
    return (
        <>
            {(addingTrip)?
                <form className="window">
                    <div className="window-header">
                        <button onClick={()=>setBool(!addingTrip)}>O</button>
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