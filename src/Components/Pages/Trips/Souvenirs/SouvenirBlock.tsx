import React, {useRef, useState} from 'react';
import {City, Souvenir, TripPoint} from "../../../../Helpers/DataTypes";
import Modal from "../../../Fragments/Modal";
import {post} from "../../../../Server/Requests";
import useSwitch from "../../../../Hooks/useSwitch";
import ButtonSelectWithInput from "../../../Fragments/ButtonSelectWithInput";
import useFetch from "../../../../Hooks/useFetch";
import {useForm} from "react-hook-form";
import SearchInput from "../../../Fragments/SearchInput";
import ButtonSelect from "../../../Fragments/ButtonSelect";
import EditSouvenirModal from "../../Souvenirs/EditSouvenirModal";
import SouvenirModal from "../../Souvenirs/SouvenirModal";
import {SouvenirTitle} from "../../Souvenirs/SouvenirPage";


function SouvenirBlock({s}:{s:Souvenir}) {
    const editSouvenirRef = useRef(null)

    return (
        <>
            <button className="highlight" key={s.souvenir_id} ref={editSouvenirRef}>
                <h3>{SouvenirTitle(s)}</h3>
                {s.city&&<h5>{s.city}</h5>}
            </button>
            <SouvenirModal s={s} openRef={editSouvenirRef}/>
        </>
    );
}

export default SouvenirBlock;