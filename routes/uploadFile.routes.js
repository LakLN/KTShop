const express = require('express');
const { fileUpload } = require('../controller/upload.controller');
const uploader = require('../middleware/uploder');

const router = express.Router();

/**
 * @swagger
 * /api/upload/single:
 *   post:
 *     summary: Upload a single file
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 */
router.post('/single', uploader.single('file'), fileUpload);

module.exports = router;
