import React, { useState } from "react";
import { S3Client, PutObjectCommand, UploadPartCommand, CompleteMultipartUploadCommand, CreateMultipartUploadCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { fromTemporaryCredentials } from "@aws-sdk/credential-providers";
import { Form, Input, Upload, Button, message, Avatar } from "antd";
import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { createTag, s3STSForImage, s3STSForModel } from "@/services/api";

const UploadImage = (props: any) => {
    console.log("S3UploadForm props:", props);
    const [loading, setLoading] = useState(false);
    const [precent, setPrecent] = useState(0);
    const [imageUrl, setImageUrl] = useState<string>();
    const handleUpload = async ({ file, onSuccess, onError }) => {
        setLoading(true);
        setPrecent(0)
        setImageUrl(undefined);
        try {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
              message.error('You can only upload JPG/PNG file!');
              return
            }
            const response = await s3STSForImage();
            const { access_key_id, access_secret, security_token, expire_time } =
                response.data.sts;
            const { prefix_path, bucket_name } = response.data;
            const params = {
                Bucket: bucket_name,
                Key: `${prefix_path}/${file.name}`,
                Body: file,
            };
            const s3 = new S3Client({
                region: "ap-east-1",
                credentials: {
                    accessKeyId: access_key_id,
                    secretAccessKey: access_secret,
                    sessionToken: security_token,
                },
            });
            const putObjectCommand = new PutObjectCommand(params);
            const upload = await s3.send(putObjectCommand);
            const Location=`https://${bucket_name}.s3.ap-east-1.amazonaws.com/${prefix_path}/${file.name}`
            console.log("Upload response:", upload);
            setImageUrl(Location);
            message.success("Upload successful");
            onSuccess(null, file);
            props.onChange && props.onChange(Location);
        } catch (err) {
            console.error("Upload error:", err);
            message.error("Upload failed");
            onError(err);
        }
    };

    const onFinish = (values) => {
        console.log("Form values:", values);
        message.success("Form submitted successfully");
    };
    const uploadButton = (
        <button style={{ border: 0, background: 'none', color: '#fff' }} >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload </div>
        </button>
    );

    return (
        <Upload customRequest={handleUpload} name="avatar"
            listType="picture-card"
            className="avatar-uploader" showUploadList={false} style={{overflow:'hidden'}}>
            {props.value ? <Avatar shape="square" style={{width:96,height:96}} src={<img src={props.value}></img>}></Avatar> : uploadButton}

        </Upload>
    );
};

export default UploadImage;
