import React, {useState} from "react";
import {post} from "../App";



function SearchInput<Type>({id, array,stringify, register, onChange}:
                               {id:string, array:Type[], stringify:{(arg0: Type):string}, register?:any, onChange:{(arg0:string):void}}) {
    const [query, setQuery] = useState("")
    let [queryResult, setResult] = useState<string>("");
    const [queryIsDone, setDone] = useState<boolean>(false);
    const [focus, setFocus] = useState<boolean>(false);
    function reset(){
        setResult("")
        setDone(false)
        setFocus(false)
        setFocus(false)
    }
    const list=array.filter(item => {
        let itemString = stringify(item).toLowerCase();
        if (query === '' || itemString==query) {
            return null;
        } else if (itemString.startsWith(query.toLowerCase()) || (query.length>2 && itemString.includes(query.toLowerCase()))) {
            return post;
        }
    }).map(item=>
        <div key={stringify(item).toLowerCase()} className="hoverable" >
            <p onClick={()=>{
                if(!queryIsDone){
                    setDone(true)
                    setResult(stringify(item))
                    setQuery(stringify(item));
                }
            }}>{stringify(item)}</p>
        </div> )
    return <>
                <input type="text" autoComplete="off" className="search" id={id} {...register} required={true}
                       value={(queryIsDone)?queryResult:query} onChange={(eve)=>{
                           // if(!queryIsDone)
                                setQuery(eve.target.value)
                        onChange(query);
                                setFocus(true)
                        //setDone(false)
                }} onClick={()=>setDone(false)}
                    onBlur={()=>reset()}
                />
                {(!queryIsDone && focus)?
                    <div className="results" onBlur={()=>reset()} onClick={()=>setFocus(true)}>{list}</div>:<></>}

            </>
}

export default SearchInput;