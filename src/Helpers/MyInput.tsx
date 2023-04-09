import React, {PropsWithChildren, useState} from 'react';
import {ChangeHandler, RefCallBack, UseFormRegisterReturn} from "react-hook-form";
import SearchInput from "../Components/Fragments/SearchInput";
import SmartWaiter from "./SmartWaiter";

type FieldType<field extends string, Type>={
    field : string
    type:Type
}
interface Props<field extends string, Type>{
    reg:UseFormRegisterReturn<field>, array:Type[], id:string, stringify:{(arg0: Type):string},
    onSetValue:{(arg0:string):void}, onlySelect?:boolean, defaultValue?:string,
}

function MyInput<field extends string, Type, >(props: PropsWithChildren<Props<field, Type>>
) {
    const [picked, setPicked] = useState<boolean>(false)
    return (

        <SmartWaiter timesUp={!picked}>
            <SearchInput id={props.id} array={props.array} stringify={props.stringify} onSetValue={props.onSetValue} onlySelect={props.onlySelect}
                        defaultValue={props.defaultValue}/>
            <input {...props.reg}/>
        </SmartWaiter>
    );
}

export default MyInput;