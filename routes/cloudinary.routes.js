const express = require('express');
const router = express.Router();
const uploader = require('../middleware/uploder');
const {
  saveImageCloudinary,
  addMultipleImageCloudinary,
  cloudinaryDeleteController,
} = require('../controller/cloudinary.controller');
const multer = require('multer');

const upload = multer();

/**
 * @swagger
 * /api/cloudinary/add-img:
 *   post:
 *     summary: Upload a single image to Cloudinary
 *     tags: [Cloudinary]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to be uploaded
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/add-img', upload.single('image'), saveImageCloudinary);

/**
 * @swagger
 * /api/cloudinary/add-multiple-img:
 *   post:
 *     summary: Upload multiple images to Cloudinary
 *     tags: [Cloudinary]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Images to be uploaded
 *     responses:
 *       200:
 *         description: Multiple images uploaded successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/add-multiple-img', upload.array('images', 5), addMultipleImageCloudinary);

/**
 * @swagger
 * /api/cloudinary/img-delete:
 *   delete:
 *     summary: Delete an image from Cloudinary
 *     tags: [Cloudinary]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               public_id:
 *                 type: string
 *                 description: The public_id of the image to be deleted from Cloudinary
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Image not found
 *       500:
 *         description: Server error
 */
router.delete('/img-delete', cloudinaryDeleteController);

module.exports = router;
