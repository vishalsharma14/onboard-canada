import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.load();

const BUCKET_NAME = "oacademy";
const PRESIGNED_URL_EXPIRY_TIME = 60 * 5;

const MAX_FILE_SIZE = 1000 * 1000 * 1; // 1 MB
const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});


export const getPresignedUrl = (fileName) => {
  const url = s3.getSignedUrl("getObject", {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Expires: PRESIGNED_URL_EXPIRY_TIME,
  });
  return url;
};

export const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    const bufferData = file.buffer;
    const fileName = `${Date.now()}-${file.originalname}`;

    const params = {
      Bucket: BUCKET_NAME,
      Body: bufferData,
      Key: fileName,
    };
    if (file.size > MAX_FILE_SIZE) {
      resolve({
        success: false,
        error: `File size is greater than ${MAX_FILE_SIZE / 1000000} MB`,
      });
    }

    s3.upload(params, (err, data) => {
      if (err) {
        resolve({
          success: false,
          error: err,
        });
      }
      console.log("FILEE", params);

      if (data) {
        resolve({
          success: true,
          fileName,
        });
      }
    });
  });
};
