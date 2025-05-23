const fs = require("fs");
const { cloudinaryServices } = require("../services/cloudinary.service");

// Upload một ảnh lên Cloudinary (ảnh đơn)
const saveImageCloudinary = async (req, res, next) => {
  try {
    // Lưu ý req.file.buffer chỉ dùng nếu bạn cấu hình multer với storage: memoryStorage()
    const result = await cloudinaryServices.cloudinaryImageUpload(req.file.buffer);
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        url: result.secure_url,
        id: result.public_id,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Upload nhiều ảnh lên Cloudinary (ảnh mảng)
const addMultipleImageCloudinary = async (req, res) => {
  try {
    const files = req.files;
    const uploadResults = [];

    for (const file of files) {
      // Nếu dùng diskStorage, bạn upload bằng file.path
      const result = await cloudinaryServices.cloudinaryImageUpload(file.path);
      uploadResults.push(result);
    }

    // Xoá file local sau upload (nếu dùng diskStorage)
    for (const file of files) {
      fs.unlinkSync(file.path);
    }

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      data: uploadResults.map(res => ({
        url: res.secure_url,
        id: res.public_id,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Failed to upload images",
    });
  }
};

// Xoá ảnh trên Cloudinary
const cloudinaryDeleteController = async (req, res) => {
  try {
    const { folder_name, id } = req.query;
    // public_id đúng định dạng Cloudinary lưu file: 'folder_name/id'
    const public_id = `${folder_name}/${id}`;
    const result = await cloudinaryServices.cloudinaryImageDelete(public_id);
    res.status(200).json({
      success: true,
      message: "Delete image successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Failed to delete image",
    });
  }
};

module.exports = {
  saveImageCloudinary,
  addMultipleImageCloudinary,
  cloudinaryDeleteController,
};
