const dotenv = require('dotenv').config();

const AWS = require('aws-sdk');
const Fs = require('fs');

const BUCKET_NAME = process.env.AWS_BUCKET;
const IAM_USER_KEY = process.env.AWS_KEY;
const IAM_USER_SECRET = process.env.AWS_SECRET_KEY;

exports.uploadSingle = (filePath, filename, prefix = null) => {
  return new Promise((resolve, reject) => {
    try {
      const s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME,
        region: 'ap-southeast-1',
      });

      s3bucket.createBucket(async () => {
        const params = {
          Bucket: BUCKET_NAME,
          Key: prefix ? `${prefix}/${filename}` : filename,
          Body: Fs.createReadStream(filePath),
          ACL: 'public-read',
        };
        s3bucket.upload(params, async (error, data) => {
          if (error) {
            reject(new Error(error));
          }
          resolve({
            error,
            data,
          });
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.deleteSingleFile = (key) =>
  new Promise((resolve, reject) => {
    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: key,
      };

      const s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        region: 'ap-southeast-1',
      });

      s3bucket.deleteObject(params, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
