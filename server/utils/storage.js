// const AWS = require('aws-sdk');

// const keys = require('../config/keys');

// exports.s3Upload = async image => {
//   let imageUrl = "";
//   let imageKey = "";

//   if (image) {
//     const s3bucket = new AWS.S3({
//       accessKeyId: keys.aws.accessKeyId,
//       secretAccessKey: keys.aws.secretAccessKey,
//       region: keys.aws.region
//     });

//     const params = {
//       Bucket: keys.aws.bucketName,
//       Key: image.originalname,
//       Body: image.buffer,
//       ContentType: image.mimetype,
//       ACL: 'public-read'
//     };

//     const s3Upload = await s3bucket.upload(params).promise();

//     imageUrl = s3Upload.Location;
//     imageKey = s3Upload.key;
//   }

//   return { imageUrl, imageKey };
// };


const cloudinary = require('cloudinary').v2;
const keys = require('../config/keys');

// Configure Cloudinary
cloudinary.config({
  cloud_name: keys.cloudinary.cloudName,
  api_key: keys.cloudinary.apiKey,
  api_secret: keys.cloudinary.apiSecret
});

exports.cloudinaryUpload = async (image) => {
  let imageUrl = "";
  let imageKey = "";

  if (image) {
    try {
      // Upload the image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'your-folder-name' },  // Optional folder in Cloudinary
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        // Pass the image buffer to the upload stream
        uploadStream.end(image.buffer);
      });

      imageUrl = result.secure_url;  // Cloudinary image URL
      imageKey = result.public_id;   // Cloudinary image key (public_id)

    } catch (error) {
      console.error('Cloudinary upload error:', error);
    }
  }

  return { imageUrl, imageKey };
};