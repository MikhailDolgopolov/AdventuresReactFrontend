import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSlidersH, faTrash} from "@fortawesome/free-solid-svg-icons";
import React from "react";

function EditEntry({onEdit, onDelete, editRef, deleteRef}:{onEdit:()=>void, onDelete:()=>void,
    editRef:React.MutableRefObject<HTMLButtonElement|null>,deleteRef?:React.MutableRefObject<HTMLButtonElement|null>}) {
    return <div className="row right">
        <button ref={editRef} className="center-child big square" onClick={onEdit}>
            <FontAwesomeIcon icon={faSlidersH} size="lg"/>
        </button>
        <button ref ={deleteRef} className="center-child big square" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} size="lg"/>
        </button>
    </div>;
}
export default EditEntry;