import React, {useEffect, useState} from 'react';
import {waitFor} from "@testing-library/react";

function SearchInput<Type>({id, array,stringify, onSetValue, onSetItem, onlySelect, defaultValue, not_required}:
                                                              {id:string, array:Type[]|undefined, stringify:{(arg0: Type):string},not_required?:boolean
                                                                  onSetItem?:{(arg0:Type|undefined):void}, onSetValue:{(arg0:string):void}, onlySelect?:boolean, defaultValue?:string}) {
    const [query, setQuery] = useState<string>("");
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();


    useEffect(()=>{
        if(!defaultValue) defaultValue="";
        setQuery(defaultValue)
    }, [defaultValue,])

    const list=(array)?array.filter(item => {
        let itemString = stringify(item).toLowerCase();
        if (itemString==query || query=="") {
            return null;
        } else if (itemString.startsWith(query.toLowerCase()) || (query.length>2 && itemString.includes(query.toLowerCase()))) {
            return item;
        }
    }).map(item=>
        <div key={stringify(item).toLowerCase()} className="hoverable" onClick={()=>{
            setQuery(stringify(item))
            setIsFocus(false);
            onSetValue(stringify(item))
            if(onSetItem) onSetItem(item)
        }}  >
            <p>{stringify(item)}</p>
        </div> ):[]


    function Timeout(t:number, str?:string){
        if(str!=undefined) setQuery(str)
        if(timer) {clearTimeout(timer); setTimer(undefined)}
        setIsFocus(true)
        if(!str) str=""
        const item =array?array.find(item=>(stringify(item)==str)):undefined
        let empty=(array&&item)?str:""
        onSetValue(onlySelect?empty:query);
        if(onSetItem) onSetItem(item)
        if(empty=="") t*=0.7
        setTimer(setTimeout(()=>{
            setIsFocus(false)
            clearTimeout(timer)
        }, t*1000));

    }

    return <>
        <input type="text" autoComplete="off" className="search" id={id} value={query} required={!not_required}
               onFocus={() => {
                   setIsFocus(true)
                   Timeout(7)
               }}
               onBlur={() => {Timeout(7);}}
               onClick={() => {
                   setIsFocus(!isFocus)
               }}
               onChange={(e) => {
                   Timeout(13, e.target.value)
               }}/>
        {(isFocus && list.length > 0) ?
            <div className="outline results">{list}</div>
            : <></>}
    </>
    }

    export default SearchInput;