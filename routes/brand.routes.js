const express = require('express');
const router = express.Router();
const brandController = require('../controller/brand.controller');

/**
 * @swagger
 * /api/brand/add:
 *   post:
 *     summary: Add a new brand
 *     tags: [Brand]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the brand
 *               description:
 *                 type: string
 *                 description: Description of the brand
 *     responses:
 *       201:
 *         description: Brand added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/add', brandController.addBrand);

/**
 * @swagger
 * /api/brand/add-all:
 *   post:
 *     summary: Add multiple brands
 *     tags: [Brand]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Name of the brand
 *                 description:
 *                   type: string
 *                   description: Description of the brand
 *     responses:
 *       201:
 *         description: Brands added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/add-all', brandController.addAllBrand);

/**
 * @swagger
 * /api/brand/active:
 *   get:
 *     summary: Get all active brands
 *     tags: [Brand]
 *     responses:
 *       200:
 *         description: List of active brands
 *       500:
 *         description: Server error
 */
router.get('/active', brandController.getActiveBrands);

/**
 * @swagger
 * /api/brand/all:
 *   get:
 *     summary: Get all brands
 *     tags: [Brand]
 *     responses:
 *       200:
 *         description: List of all brands
 *       500:
 *         description: Server error
 */
router.get('/all', brandController.getAllBrands);

/**
 * @swagger
 * /api/brand/delete/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brand]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Server error
 */
router.delete('/delete/:id', brandController.deleteBrand);

/**
 * @swagger
 * /api/brand/get/{id}:
 *   get:
 *     summary: Get a single brand by ID
 *     tags: [Brand]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to be fetched
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched brand
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Server error
 */
router.get('/get/:id', brandController.getSingleBrand);

/**
 * @swagger
 * /api/brand/edit/{id}:
 *   patch:
 *     summary: Update a brand by ID
 *     tags: [Brand]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the brand
 *               description:
 *                 type: string
 *                 description: Updated description of the brand
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Server error
 */
router.patch('/edit/:id', brandController.updateBrand);

module.exports = router;
