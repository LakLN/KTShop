const { cloudinaryImageUpload, cloudinaryImageDelete } = require('../services/cloudinary.service');

// Upload một ảnh lên Cloudinary (ảnh đơn)
const saveImageCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    const result = await cloudinaryImageUpload(req.file.buffer);
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (err) {
    console.error('CLOUDINARY UPLOAD ERROR:', err); // <--- log lỗi ra
    res.status(500).json({
      success: false,
      message: "Something went wrong !",
      errorMessages: [{ message: err.message || err }]
    });
  }
};

// Upload nhiều ảnh lên Cloudinary
const addMultipleImageCloudinary = async (req, res, next) => {
  try {
    if (!req.files || !req.files.length) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }
    const uploadResults = await Promise.all(
      req.files.map(file => cloudinaryImageUpload(file.buffer))
    );
    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      data: uploadResults.map(res => ({
        url: res.secure_url,
        public_id: res.public_id,
      })),
    });
  } catch (err) {
    next(err);
  }
};

// Xoá ảnh trên Cloudinary
const cloudinaryDeleteController = async (req, res, next) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).json({ success: false, message: "Missing public_id" });
    }
    await cloudinaryImageDelete(public_id);
    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  saveImageCloudinary,
  addMultipleImageCloudinary,
  cloudinaryDeleteController,
};
