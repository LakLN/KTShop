const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');

/**
 * @swagger
 * /api/category/get/{id}:
 *   get:
 *     summary: Get a single category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to be fetched
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched category
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get('/get/:id', categoryController.getSingleCategory);

/**
 * @swagger
 * /api/category/add:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *               description:
 *                 type: string
 *                 description: Description of the category
 *     responses:
 *       201:
 *         description: Category added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/add', categoryController.addCategory);

/**
 * @swagger
 * /api/category/add-all:
 *   post:
 *     summary: Add multiple categories at once
 *     tags: [Category]
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
 *                   description: Name of the category
 *                 description:
 *                   type: string
 *                   description: Description of the category
 *     responses:
 *       201:
 *         description: Categories added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/add-all', categoryController.addAllCategory);

/**
 * @swagger
 * /api/category/all:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of all categories
 *       500:
 *         description: Server error
 */
router.get('/all', categoryController.getAllCategory);

/**
 * @swagger
 * /api/category/show/{type}:
 *   get:
 *     summary: Get category by product type
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Product type to filter categories by
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categories of the specified product type
 *       404:
 *         description: Product type not found
 *       500:
 *         description: Server error
 */
router.get('/show/:type', categoryController.getProductTypeCategory);

/**
 * @swagger
 * /api/category/show:
 *   get:
 *     summary: Get show categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Show categories fetched successfully
 *       500:
 *         description: Server error
 */
router.get('/show', categoryController.getShowCategory);

/**
 * @swagger
 * /api/category/delete/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.delete('/delete/:id', categoryController.deleteCategory);

/**
 * @swagger
 * /api/category/edit/{id}:
 *   patch:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to be updated
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
 *                 description: Updated name of the category
 *               description:
 *                 type: string
 *                 description: Updated description of the category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.patch('/edit/:id', categoryController.updateCategory);
router.patch('/category/:id/soft-delete', categoryController.softDeleteCategory);
router.patch('/category/:id/restore', categoryController.restoreCategory);


module.exports = router;
