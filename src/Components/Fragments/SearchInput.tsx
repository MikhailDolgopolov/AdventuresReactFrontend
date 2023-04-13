import React, {useEffect, useState} from 'react';

function SearchInput<Type>({id, array,stringify, onSetValue, onlySelect, defaultValue, not_required}:
                                                              {id:string, array:Type[]|undefined, stringify:{(arg0: Type):string},not_required?:boolean
                                                                  onSetValue:{(arg0:string):void}, onlySelect?:boolean, defaultValue?:string}) {
    const [query, setQuery] = useState<string>("");
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
    if(!defaultValue) defaultValue="";

    useEffect(()=>{
        setQuery(defaultValue!)
    }, [])
    //useLogger(query)

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
        setIsFocus(false)
        onSetValue(stringify(item))
    }}  >
    <p>{stringify(item)}</p>
    </div> ):[]


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
                       setQuery(e.target.value)
                       Timeout(16)
                   }}/>
            {(isFocus && list.length > 0) ?
                <div className="outline results">{list}</div>
                : <></>}
        </>
    }

    export default SearchInput;