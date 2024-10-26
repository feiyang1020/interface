import React, { useEffect, useRef } from "react";
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import './index.less';
import { message } from "antd";
import { s3STSForImage } from "@/services/api";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {

    const handleUpload = async (files, callback) => {
        const file = files[0];
        try {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
              message.error('You can only upload JPG/PNG file!');
              return
            }
            const response = await s3STSForImage();
            const { access_key_id, access_secret, security_token, expire_time } =
                response.data.sts;
            const { prefix_path, bucket_name,region,location_host,endpoint } = response.data;
            const fileName = `${uuidv4()}.${file.name.split('.').pop()}`;
            const params = {
                Bucket: bucket_name,
                Key: `${prefix_path}/${fileName}`,
                Body: file,
            };
            const s3 = new S3Client({
                region,
                endpoint,
                credentials: {
                    accessKeyId: access_key_id,
                    secretAccessKey: access_secret,
                    sessionToken: security_token,
                },
            });
            const putObjectCommand = new PutObjectCommand(params);
            const upload = await s3.send(putObjectCommand);
            const Location=`https://${location_host}/${prefix_path}/${fileName}`
            console.log("Upload response:", upload);
            callback([Location]);
        } catch (err) {
            console.error("Upload error:", err);
            message.error("Upload failed");
            
        }
    };


    return (
        <div className="mdeditor">
            <MdEditor
                modelValue={value}
                onChange={onChange}
                theme="dark" // 启用暗色主题
                preview={false}
                language="en-US"
                onUploadImg={handleUpload}
                style={{ height: '250px' }}
                toolbarsExclude={['github','htmlPreview','previewOnly','save',]}
            />
        </div>
    );
};

export default MarkdownEditor;
