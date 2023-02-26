import React, {useState} from 'react';

function SearchInput<Type>({id, array,stringify, register, onSetValue}:
                    {id:string, array:Type[], stringify:{(arg0: Type):string},
                        register?:any, onSetValue:{(arg0:Type):void}}) {
    const [query, setQuery] = useState<string>("");
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();


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
        }}  >
            <p>{stringify(item)}</p>
        </div> )


    function Timeout(t:number){
        if(timer) {clearTimeout(timer); setTimer(undefined)}
        setIsFocus(true)
        setTimer(setTimeout(()=>{
            setIsFocus(false)
            clearTimeout(timer)
        }, t*1000));

    }

    return <>
        <input type="text" autoComplete="off" className="search" id={id} {...register} value={query} required={true}
               onFocus={()=>{
                   setIsFocus(true)
                   Timeout(7)}}
               onBlur={()=>Timeout(7)}
               onClick={()=>{
                    setIsFocus(!isFocus)}}
               onChange={(e)=>{
                   Timeout(16)
                   setQuery(e.target.value)
               }}/>
        {(isFocus && list.length>0)?
            <div className="outline results">{list}</div>
            :<></>}
    </>
}

export default SearchInput;