import React, {ChangeEvent, useState} from "react";
import TitleSubtitle from "../Fragments/TitleSubtitle";
import { serverProperties } from "../../Server/ServerProperties";
import MinioImage from "../Fragments/MinioImage";
import axios from "axios";

function Files() {


    const [file, setFile] = useState<File>();
    const [image_data, setImage] = useState<string>("")

    const HandleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target.files) return;
        setFile(e.target.files[0]);
        
    };

    function _imageEncode (arrayBuffer:ArrayBuffer) {
        let u8 = new Uint8Array(arrayBuffer)
        let ii = [].reduce.call(
            new Uint8Array(arrayBuffer), function(p,c)
            {return p+String.fromCharCode(c)},'') as string
        let b64encoded = btoa(ii)
        let mimetype="image/jpeg"
        return "data:"+mimetype+";base64,"+b64encoded
    }

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

    const onClickHandler = async () => {
        axios.get(serverProperties.root+"files/load/hi", {
            responseType: 'arraybuffer'
          }).then(result=>setImage(_imageEncode(result.data)));
}

    return (
        <>
            <TitleSubtitle title={"Файл"}/>
            <div className="vert-margins">
            <div>
                <input type="file" onChange={HandleFileChange} />
                <div>{file && `${file.name} - ${file.type}`}</div>
                <button onClick={handleUploadClick}>Upload</button>
                <button onClick={onClickHandler}>Download</button>
            </div>
            </div>
            {image_data&&<img src={image_data} />}
        </>
    );
}

export default Files;