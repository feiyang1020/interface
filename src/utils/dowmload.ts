import { downloadToken, s3STSForModel } from "@/services/api";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
const streamToBlob = async (stream: any) => {
  const reader = stream.getReader();
  const chunks = [];
  let done, value;
  while ((({ done, value } = await reader.read()), !done)) {
    chunks.push(value);
  }
  return new Blob(chunks);
};
export const downloadFile = async (id: number, url: string) => {
  try {
    const response = await downloadToken(id);
    const { access_key_id, access_secret, security_token, expire_time } =
      response.data.sts;
    const { prefix_path, bucket_name, region, endpoint } = response.data;
    const key = url.replace('bm-pri/', "");
    

    const params = {
      Bucket: bucket_name,
      Key: 'model/20241107235709_503/1sy3y601000d5g2iynnh7m9400mzq2ep/923e7a28-c2ca-474d-84a5-6b9f74f8d060.zip'
    };
    console.log(params,{
      region,
      endpoint,
      credentials: {
        accessKeyId: access_key_id,
        secretAccessKey: access_secret,
        sessionToken: security_token,
      },
    });
    const s3 = new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId: access_key_id,
        secretAccessKey: access_secret,
        sessionToken: security_token,
      },
    });
    const command = new GetObjectCommand({
      Bucket: params.Bucket,
      Key: params.Key,
    });
    const ret = await s3.send(command);
    console.log("Download file response:", response);
    const blob = await streamToBlob(ret.Body);
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = url;
    link.click();
    URL.revokeObjectURL(fileUrl);
  } catch (error) {
    console.error("Error downloading file:", error);
    throw Error(error);
  }
};
