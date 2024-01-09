import React, {ChangeEvent, useState} from "react";
import TitleSubtitle from "../Fragments/TitleSubtitle";
import LoadingError from "./LoadingError";
import useFetch from "../../Hooks/useFetch";
import { serverProperties } from "../../Server/ServerProperties";

function Files() {


    const [file, setFile] = useState<File>();

    const HandleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target.files) return;
        setFile(e.target.files[0]);
        
    };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
        formData.append('file', file, file.name);
        fetch(serverProperties.root+"files/upload/", {
            method: 'post',
            body: formData
        }).then(res => {
            if(res.ok) {
                alert("File uploaded successfully.")
            }
        });
    }

    return (
        <>
            <TitleSubtitle title={"Файл"}/>
            <div className="vert-margins">
            <div>
                <input type="file" onChange={HandleFileChange} />
                <div>{file && `${file.name} - ${file.type}`}</div>
                <button onClick={handleUploadClick}>Upload</button>
            </div>
            </div>
        </>
    );
}

export default Files;