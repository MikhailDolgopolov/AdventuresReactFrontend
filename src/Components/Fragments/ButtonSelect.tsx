import React, {useEffect} from 'react';
import Loading from "../Pages/Loading";

function ButtonSelect<Type>({array, id, stringify, onSelect, children, clearSwitch, reset}:
                                {array:Type[]|undefined, id:string, stringify:{(arg0:Type):string}, clearSwitch?:any,reset?:boolean
    onSelect:{(arg0:Type):void}, children?:JSX.Element[]|JSX.Element}) {
    if(!array) return <Loading object={"данные"}/>
    function deselectAll(){
        let buttons=document.getElementsByClassName("my-select-button-"+id);
        let iter = Array.from(buttons)
        iter.forEach(function (e){
            e.setAttribute("selected", "0")
        })
    }
    function styleSelection(l_id:string){
        if(!l_id) return
        deselectAll()
        document.getElementById(l_id)!.setAttribute("selected", "1")
    }
    useEffect(()=>{
        if(!reset != clearSwitch)
            deselectAll()
        if(!reset && !clearSwitch)
            styleSelection(stringify(array[0]))

    },[reset, clearSwitch])
    return (
        <div className="flex-grid wide">
            {array.map(item=>
                <button type="button" key={stringify(item)} id={stringify(item)}
                        className={"flex-block hoverable my-select-button-"+id}
                        onClick={()=>{
                            styleSelection(stringify(item))
                            onSelect(item)
                }}>
                    {stringify(item)}
                </button>
            )}
            {children}
        </div>
    );
}

export default ButtonSelect;