import React from "react";
import {minio_cred} from "../../Server/Secrets"
import { Stream } from "stream";
import AWS from "aws-sdk";


function MinioImage({path}:{path:string}){
    // var Minio = require('minio')
    var awsClient = new AWS.S3({
        endpoint: '192.168.1.10:9001',
        
        accessKeyId: minio_cred.accessKey,
        secretAccessKey: minio_cred.secretKey,
        s3ForcePathStyle: true,
        signatureVersion: "v4"
    })
    // var minioClient = new Minio.Client({
    //     endPoint: '192.168.1.10',
    //     port:9001,
    //     accessKey: minio_cred.accessKey,
    //     secretKey: minio_cred.secretKey
    // })
    // const stream = minioClient.getObject('first-test', 'photo.jpg').then((data: any) => console.log(data))
    // minioClient.getObject("first-test","test.jpg",  (err:any, data:any)=>{console.log(data);console.log(err)})
    return <div>
        <Image></Image>
    </div>
}

export default MinioImage