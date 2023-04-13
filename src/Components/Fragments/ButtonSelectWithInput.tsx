import React, {useState} from 'react';
import ButtonSelect from "./ButtonSelect";
import useSwitch from "../../Hooks/useSwitch";

function ButtonSelectWithInput<Type>({array, id, stringify, onSelect}:{array:Type[]|undefined, id:string, stringify:{(arg0:Type):string}, deselect?:any,
    onSelect:{(arg0:Type|string):void}}) {
    const [inputValue, setInput] = useState<string>("")
    const [inputCleared, clear] = useState(false)

    function inputChanged(str:string){
        setInput(str);
        if(str=="") clear(!inputCleared)
        if(str!="") onSelect(str)

    }
    return (
        <ButtonSelect<Type> array={array} id={id} onSelect={(res)=>
            {inputChanged("");onSelect(res)}}
                            stringify={stringify} clearSwitch={inputValue} reset={inputCleared}>
            <input value={inputValue} onChange={(event)=>inputChanged(event.target.value)}/>
        </ButtonSelect>
    );
}

export default ButtonSelectWithInput;