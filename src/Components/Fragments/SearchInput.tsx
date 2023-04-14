import React, {useEffect, useRef, useState} from 'react';

function SearchInput<Type>({id, array,stringify, onSetValue, onlySelect, defaultValue, not_required, myRef}:
                                                              {id:string, array:Type[]|undefined, stringify:{(arg0: Type):string},not_required?:boolean
                                                                  onSetValue?:{(arg0:string):void}, onlySelect?:boolean, defaultValue?:string, myRef?:React.MutableRefObject<HTMLInputElement|null>}) {
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
        setIsFocus(false);
        if (typeof onSetValue === 'function') onSetValue(stringify(item))
    }}  >
    <p>{stringify(item)}</p>
    </div> ):[]


    function Timeout(t:number, str?:string){
        if(myRef&&myRef.current) str=myRef.current.value
        if(str!=undefined) setQuery(str)
        if(timer) {clearTimeout(timer); setTimer(undefined)}
        setIsFocus(true)
        if(!str) str=""
        let empty=(array&&array.find(item=>(stringify(item)==str)))?str:""
        if (typeof onSetValue === 'function') onSetValue(onlySelect?empty:query);
        if(empty=="") t*=0.7
        setTimer(setTimeout(()=>{
            if(onlySelect && empty=="") setQuery("")
            setIsFocus(false)
            clearTimeout(timer)
        }, t*1000));

    }

    return <>
            <input type="text" autoComplete="off" className="search" id={id} value={query} required={!not_required} ref={myRef}
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