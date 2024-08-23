import React, { useState } from "react";
import { S3Client, PutObjectCommand, UploadPartCommand, CompleteMultipartUploadCommand, CreateMultipartUploadCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { Form, Input, Upload, Button, message } from "antd";
import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { createTag, s3STSForImage, s3STSForModel, s3STSForModelRefresh } from "@/services/api";
type FileType = /*unresolved*/ any
const S3UploadForm = (props: any) => {
  console.log("S3UploadForm props:", props);
  const [loading, setLoading] = useState(false);
  const [precent, setPrecent] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>();
  const getS3ClientParams = async (prefix_path?: string) => {
    if (!prefix_path) {
      const response = await s3STSForModel();
      return response;
    } else {
      const response = await s3STSForModelRefresh({ prefix_path });
      return response;
    }
  };

  const beforeUpload = (file: FileType) => {
    console.log("beforeUpload file:", file);
    const isZip = file.type === 'application/zip' || file.type === 'application/x-zip-compressed';
    if (!isZip) {
      message.error('You can only upload zip file!');
    }
    const isLt10G = file.size / 1024 / 1024 / 1024 < 10;
    if (!isLt10G) {
      message.error("file must smaller than 10GB!");
    }
    return isZip && isLt10G;
  };
  const handleUpload = async ({ file, onSuccess, onError }: any) => {
    setLoading(true);
    setPrecent(0)
    setImageUrl(undefined);
    try {
      const response = await getS3ClientParams();
      const { access_key_id, access_secret, security_token, expire_time } =
        response.data.sts;
      const { prefix_path, bucket_name } = response.data;
      const params = {
        Bucket: bucket_name,
        Key: `${prefix_path}/${file.name}`,
        Body: file,
      };
      let s3 = new S3Client({
        region: "ap-east-1",
        credentials: {
          accessKeyId: access_key_id,
          secretAccessKey: access_secret,
          sessionToken: security_token,
        },
      });
      const createMultipartUploadCommand = new CreateMultipartUploadCommand({
        Bucket: params.Bucket,
        Key: params.Key
      });
      const createMultipartUploadResponse = await s3.send(createMultipartUploadCommand);

      const { UploadId } = createMultipartUploadResponse;

      const chunkSize = 5 * 1024 * 1024; // 5MB
      const totalChunks = Math.ceil(file.size / chunkSize);
      const chunks = Array.from({ length: totalChunks }, (_, index) => {
        const start = index * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        return file.slice(start, end);
      });
      const parts = []
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const partNumber = i + 1;
        const uploadPartCommand = new UploadPartCommand({
          Bucket: bucket_name,
          Key: `${prefix_path}/${file.name}`,
          UploadId,
          PartNumber: partNumber,
          Body: chunk,
        });
        try {
          const ret = (await s3.send(uploadPartCommand));
          parts.push({ PartNumber: partNumber, ETag: ret.ETag })
          setPrecent(parseInt(String(((i + 1) / totalChunks) * 100)));
        } catch (err) {
          console.log(err)
          const refreshToken = await getS3ClientParams(prefix_path);
          s3 = new S3Client({
            region: "ap-east-1",
            credentials: {
              accessKeyId: refreshToken.data.sts.access_key_id,
              secretAccessKey: refreshToken.data.sts.access_secret,
              sessionToken: refreshToken.data.sts.security_token,
            },
          });
          const ret = (await s3.send(uploadPartCommand));
          parts.push({ PartNumber: partNumber, ETag: ret.ETag })
          setPrecent(parseInt(String(((i + 1) / totalChunks) * 100)));
        }

      }

      const completeMultipartUploadCommand = new CompleteMultipartUploadCommand({
        Bucket: bucket_name,
        Key: `${prefix_path}/${file.name}`,
        UploadId,
        MultipartUpload: {
          Parts: parts,
        },
      });

      const res = await s3.send(completeMultipartUploadCommand);
      console.log("Complete multipart upload response:", res);
      const { Location } = res;
      setImageUrl(file.name);
      setLoading(false);
      console.log("Upload successful. File location:", Location);
      const streamToBlob = async (stream: any) => {
        const reader = stream.getReader();
        const chunks = [];
        let done, value;
        while ({ done, value } = await reader.read(), !done) {
          chunks.push(value);
        }
        return new Blob(chunks);
      };
      // 
      const downloadFile = async () => {
        try {
          const command = new GetObjectCommand({
            Bucket: params.Bucket,
            Key: params.Key
          });
          const response = await s3.send(command);
          console.log("Download file response:", response);
          const blob = await streamToBlob(response.Body);
          const fileUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = fileUrl;
          link.download = file.name;
          link.click();
          URL.revokeObjectURL(fileUrl);
          message.success("File downloaded successfully");
        } catch (error) {
          console.error("Error downloading file:", error);
          message.error("Failed to download file");
        }
      };

      // Call the downloadFile function after the upload is successful
      // downloadFile();

      message.success("Upload successful");
      onSuccess(null, file);
      props.onChange && props.onChange(Location);
    } catch (err) {
      console.error("Upload error:", err);
      message.error("Upload failed");
      onError(err);
    }
  };


  const uploadButton = (
    <button style={{ border: 0, background: 'none', color: '#fff' }} >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload {precent ? `${precent}%` : ''}</div>
    </button>
  );

  return (
    <Upload beforeUpload={beforeUpload} customRequest={handleUpload} name="avatar" style={{ border: 'none' }}
      listType="picture-card"
      className="avatar-uploader" showUploadList={false}>
      {imageUrl ? imageUrl.replace(/(\w{5})\w+(\w{4})/, "$1...$2") : uploadButton}

    </Upload>
  );
};

export default S3UploadForm;
