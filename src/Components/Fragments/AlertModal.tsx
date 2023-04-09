import React from 'react';
import Modal from "./Modal";
import PopWindow from "./PopWindow";

function AlertModal({isOpen, onClose, title, description, confirmBtnLabel, onConfirm}:
                        {isOpen:boolean, onClose:()=>void, title:string, description:string, confirmBtnLabel:string, onConfirm:()=>void}) {
    return (
        <PopWindow open={isOpen}>

        </PopWindow>
    );
}

export default AlertModal;