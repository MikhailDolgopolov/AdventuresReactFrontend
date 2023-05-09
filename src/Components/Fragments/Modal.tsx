import React, {useEffect, useState} from 'react';
import ReactDom from "react-dom";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";
const Div = styled.div<{pos: string}>`position: ${props => props.pos}`;
function Modal({children, header, openRef, positioning, offToggle, freeClose, onClose}:{children: JSX.Element[]|JSX.Element, header:string,
    openRef:React.MutableRefObject<HTMLElement|null>,positioning?:string, offToggle?:boolean, freeClose?:boolean, onClose?:()=>void}) {

    const [open, setOpen] = useState<boolean>();
    const [timer] = useState<NodeJS.Timeout | undefined>();
    const [wait, setWait] = useState<boolean>(true);
    if(!positioning) positioning="fixed";

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
        if (onClose instanceof Function ) onClose()
    },[offToggle])
    if(!open) return null;
    return ReactDom.createPortal(<>
        <div className="modal-overlay cover" onClick={()=>{
            clearTimeout(timer)
            if(!wait && freeClose) setOpen(false);
        }}></div>
        <Div className="modal" pos={positioning}>
            <div className="window-header side-margins">
                <button onClick={()=>{setOpen(false); if (onClose instanceof Function ) onClose()}} className="center-child">
                    <FontAwesomeIcon icon={faXmark} size="lg"/>
                </button>
                <h2>{header}</h2>
            </div>
            {children}
        </Div>

    </>, document.getElementById("portal")!)
}

export default Modal;