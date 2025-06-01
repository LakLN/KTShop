const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || 'your_cloud_name',
  api_key: process.env.CLOUDINARY_API_KEY || 'your_api_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'your_api_secret'
});

const cloudinaryImageUpload = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "ktshop/products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    const bufferStream = new Readable();
    bufferStream.push(imageBuffer);
    bufferStream.push(null);
    bufferStream.pipe(uploadStream);
  });
};

const cloudinaryImageDelete = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id);
};

module.exports = {
  cloudinaryImageUpload,
  cloudinaryImageDelete,
};
