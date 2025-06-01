const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const {
  saveImageCloudinary,
  addMultipleImageCloudinary,
  cloudinaryDeleteController,
} = require('../controller/cloudinary.controller');

// KHÔNG IMPORT Uploader từ middleware/uploader.js ở đây!

router.post('/add-img', upload.single('image'), saveImageCloudinary);
router.post('/add-multiple-img', upload.array('images', 5), addMultipleImageCloudinary);
router.delete('/img-delete', cloudinaryDeleteController);

module.exports = router;
