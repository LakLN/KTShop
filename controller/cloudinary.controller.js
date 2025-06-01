// controller/cloudinary.controller.js
const { cloudinaryImageUpload, cloudinaryImageDelete } = require('../utils/cloudinary');

exports.saveImageCloudinary = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
    const result = await cloudinaryImageUpload(req.file.buffer);
    res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    next(error);
  }
};

exports.addMultipleImageCloudinary = async (req, res, next) => {
  try {
    if (!req.files) return res.status(400).json({ success: false, message: "No files uploaded" });
    const uploadResults = await Promise.all(
      req.files.map(file => cloudinaryImageUpload(file.buffer))
    );
    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      data: uploadResults.map(res => ({
        url: res.secure_url,
        id: res.public_id,
      })),
    });
  } catch (error) {
    next(error);
  }
};

exports.cloudinaryDeleteController = async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ success: false, message: "Missing public_id" });
    await cloudinaryImageDelete(public_id);
    res.status(200).json({ success: true, message: "Image deleted successfully!" });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Failed to delete image",
    });
  }
};
