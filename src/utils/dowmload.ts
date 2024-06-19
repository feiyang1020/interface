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
export const downloadFile = async (id:number,url: string) => {
  try {
    const response = await downloadToken(id);
    const { access_key_id, access_secret, security_token, expire_time } =
      response.data.sts;
    const { prefix_path, bucket_name } = response.data;
    const params = {
      Bucket: bucket_name,
      Key: url,
    };
    const s3 = new S3Client({
      region: "ap-east-1",
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
