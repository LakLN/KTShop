exports.fileUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    res.status(200).json({
      success: true,
      file: req.file
    });
  } catch (error) {
    next(error);
  }
};
