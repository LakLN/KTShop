const express = require('express');
const router = express.Router();
// internal
const productController = require('../controller/product.controller');

/**
 * @swagger
 * /api/product/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               stock:
 *                 type: integer
 *               rating:
 *                 type: number
 *                 description: Product rating
 *     responses:
 *       200:
 *         description: Product added successfully
 *       400:
 *         description: Bad request
 */
router.post('/add', productController.addProduct);

/**
 * @swagger
 * /api/product/add-all:
 *   post:
 *     summary: Add multiple products
 *     tags: [Product]
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
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *                 categoryId:
 *                   type: string
 *                 stock:
 *                   type: integer
 *                 rating:
 *                   type: number
 *                   description: Product rating
 *     responses:
 *       200:
 *         description: Products added successfully
 *       400:
 *         description: Bad request
 */
router.post('/add-all', productController.addAllProducts);

/**
 * @swagger
 * /api/product/all:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of all products
 */
router.get('/all', productController.getAllProducts);

/**
 * @swagger
 * /api/product/offer:
 *   get:
 *     summary: Get products with an offer timer
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Products with an offer timer
 */
router.get('/offer', productController.getOfferTimerProducts);

/**
 * @swagger
 * /api/product/top-rated:
 *   get:
 *     summary: Get top rated products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Top rated products
 */
router.get('/top-rated', productController.getTopRatedProducts);

/**
 * @swagger
 * /api/product/review-product:
 *   get:
 *     summary: Get products with reviews
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Products with reviews
 */
router.get('/review-product', productController.reviewProducts);

/**
 * @swagger
 * /api/product/popular/{type}:
 *   get:
 *     summary: Get popular products by type
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Product type (e.g., "electronics", "clothing")
 *     responses:
 *       200:
 *         description: Popular products by type
 */
router.get('/popular/:type', productController.getPopularProductByType);

/**
 * @swagger
 * /api/product/related-product/{id}:
 *   get:
 *     summary: Get related products
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to find related products
 *     responses:
 *       200:
 *         description: Related products fetched successfully
 */
router.get('/related-product/:id', productController.getRelatedProducts);

/**
 * @swagger
 * /api/product/single-product/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details fetched successfully
 */
router.get("/single-product/:id", productController.getSingleProduct);

/**
 * @swagger
 * /api/product/stock-out:
 *   get:
 *     summary: Get all products that are out of stock
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Products that are out of stock
 */
router.get("/stock-out", productController.stockOutProducts);

/**
 * @swagger
 * /api/product/edit-product/{id}:
 *   patch:
 *     summary: Edit a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               stock:
 *                 type: integer
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.patch("/edit-product/:id", productController.updateProduct);

/**
 * @swagger
 * /api/product/{type}:
 *   get:
 *     summary: Get products by type
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of product (e.g., "electronics", "clothing")
 *     responses:
 *       200:
 *         description: List of products by type
 */
router.get('/:type', productController.getProductsByType);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;
