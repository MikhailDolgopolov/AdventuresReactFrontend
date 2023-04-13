import React, {useEffect, useState} from 'react';
import ReactDom from "react-dom";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useScrollLock} from "../../Hooks/useScrollLock";
import useFetch from "../../Hooks/useFetch";
import {City} from "../../Helpers/DataTypes";

function Modal({children, header, openRef, offToggle, freeClose}:{children: JSX.Element[]|JSX.Element, header:string,
    openRef:React.MutableRefObject<HTMLElement|null>, offToggle?:boolean, freeClose?:boolean}) {

    const [open, setOpen] = useState<boolean>();
    const [timer] = useState<NodeJS.Timeout | undefined>();
    const [wait, setWait] = useState<boolean>(true);
    useEffect(()=>{
        const openListener = (event: any)=>{
            if(openRef.current && openRef.current.contains(event.target)) {
                setOpen(true)
                setWait(true)
                setTimeout(()=>{
                    setWait(false);

                }, 60);
            }

        };
        document.addEventListener("mousedown", openListener);
        document.addEventListener("touchend", openListener);


        return () => {
            document.removeEventListener("mousedown", openListener);
            document.removeEventListener("touchend", openListener);
            clearTimeout(timer)
        };
    },[])
    useEffect(()=>{
        setOpen(false)
    },[offToggle])
    if(!open) return null;
    return ReactDom.createPortal(<>
        <div className="modal-overlay cover" onClick={()=>{
            clearTimeout(timer)
            if(!wait && freeClose) setOpen(false);
        }}></div>
        <div className="modal">
            <div className="window-header side-margins">
                <button onClick={()=>setOpen(false)} className="center-child">
                    <FontAwesomeIcon icon={faXmark} size="lg"/>
                </button>
                <h2>{header}</h2>
            </div>
            {children}
        </div>

    </>, document.getElementById("portal")!)
}

export default Modal;