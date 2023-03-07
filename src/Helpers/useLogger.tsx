import React, {useEffect, useState} from "react";

export default function useLogger<Type>( value:Type){
    useEffect(()=>{
        console.log(value)
       },[value])
}