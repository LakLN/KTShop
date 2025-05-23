const { secret } = require("../config/secret");
const cloudinary = require("../utils/cloudinary");
const { Readable } = require('stream');

// Upload ảnh buffer (memoryStorage) lên Cloudinary
const cloudinaryImageUpload = (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { upload_preset: secret.cloudinary_upload_preset },
      (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Convert buffer to readable stream
    const bufferStream = new Readable();
    bufferStream.push(imageBuffer);
    bufferStream.push(null);
    bufferStream.pipe(uploadStream);
  });
};

// Xóa ảnh trên Cloudinary theo public_id
const cloudinaryImageDelete = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id);
};

module.exports = {
  cloudinaryImageUpload,
  cloudinaryImageDelete,
};
