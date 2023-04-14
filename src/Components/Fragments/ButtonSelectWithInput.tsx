import React, {useState} from 'react';
import ButtonSelect from "./ButtonSelect";
import useSwitch from "../../Hooks/useSwitch";

function ButtonSelectWithInput<Type>({array, id, stringify, onSelect, defaultValue}:
                                         {array:Type[]|undefined, id:string, stringify:{(arg0:Type):string}, deselect?:any,
    onSelect:{(arg0:Type|string):void}, defaultValue?:string}) {
    const [inputValue, setInput] = useState<string>("")
    const [inputCleared, clear] = useSwitch()

    function inputChanged(str:string){
        if(inputValue==str) return
        setInput(str);
        if(str=="") clear()
        if(str!="") onSelect(str)

    }
    return (
        <ButtonSelect<Type> array={array} id={id} defaultValue={defaultValue} onSelect={(res)=>
        {inputChanged("");onSelect(res)}}
                            stringify={stringify} clearSwitch={inputValue} resetSwitch={inputCleared}>
            <input value={inputValue} onChange={(event)=>inputChanged(event.target.value)}/>
        </ButtonSelect>
    );
}

export default ButtonSelectWithInput;