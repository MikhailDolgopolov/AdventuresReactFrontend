import React, {useEffect, useState} from "react";
import {FieldValues, Path, RegisterOptions, UseFormRegisterReturn} from "react-hook-form";

function FormSearchInput<ArrayType, FormType extends FieldValues, field extends string>({id, array,stringify, onSetValue, onlySelect, defaultValue, reg, fieldName}:
                               {id:string, array:ArrayType[], stringify:{(arg0: ArrayType):string}, fieldName :Path<FormType>,
                                   reg: <field extends Path<FormType>>(name: field, options?: RegisterOptions<FormType, field> | undefined) => UseFormRegisterReturn<field>
                                   onSetValue:{(arg0:string):void}, onlySelect?:boolean, defaultValue?:string}) {
    const [query, setQuery] = useState<string>("");
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
    if(!defaultValue) defaultValue="";

    useEffect(()=>setQuery(defaultValue!), [])
    //useLogger(query)
    const list=array.filter(item => {
        let itemString = stringify(item).toLowerCase();
        if (itemString==query || query=="") {
            return null;
        } else if (itemString.startsWith(query.toLowerCase()) || (query.length>2 && itemString.includes(query.toLowerCase()))) {
            return item;
        }
    }).map(item=>
        <div key={stringify(item).toLowerCase()} className="hoverable" onClick={()=>{
            setQuery(stringify(item))
            setIsFocus(false)
            onSetValue(stringify(item))
        }}  >
            <p>{stringify(item)}</p>
        </div> )


    function Timeout(t:number){
        if(timer) {clearTimeout(timer); setTimer(undefined)}
        setIsFocus(true)
        onSetValue(onlySelect?"":query);
        setTimer(setTimeout(()=>{
            setIsFocus(false)
            clearTimeout(timer)
        }, t*1000));

    }

    return <>
        <input {...reg(fieldName)} type="text" autoComplete="off" className="search" value={query} id={id} required={true}
               onFocus={() => {
                   setIsFocus(true)
                   Timeout(7)
               }}
               onBlur={() => {Timeout(7);}}
               onClick={() => {
                   setIsFocus(!isFocus)
               }}
               onChange={(e) => {
                   setQuery(e.target.value)
                   Timeout(16)
               }}/>
        {(isFocus && list.length > 0) ?
            <div className="outline results">{list}</div>
            : <></>}
    </>
}

export default FormSearchInput;