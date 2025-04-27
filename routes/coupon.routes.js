const express = require('express');
const router = express.Router();
const {
  addCoupon,
  addAllCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
} = require('../controller/coupon.controller');

/**
 * @swagger
 * /api/coupon/add:
 *   post:
 *     summary: Add a new coupon
 *     tags: [Coupon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Coupon code
 *               discount:
 *                 type: number
 *                 description: Discount value
 *               expirationDate:
 *                 type: string
 *                 description: Expiration date of the coupon
 *     responses:
 *       200:
 *         description: Coupon added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/add', addCoupon);

/**
 * @swagger
 * /api/coupon/all:
 *   post:
 *     summary: Add multiple coupons
 *     tags: [Coupon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: Coupon code
 *                 discount:
 *                   type: number
 *                   description: Discount value
 *                 expirationDate:
 *                   type: string
 *                   description: Expiration date of the coupon
 *     responses:
 *       200:
 *         description: Coupons added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/all', addAllCoupon);

/**
 * @swagger
 * /api/coupon:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupon]
 *     responses:
 *       200:
 *         description: List of all coupons
 *       500:
 *         description: Server error
 */
router.get('/', getAllCoupons);

/**
 * @swagger
 * /api/coupon/{id}:
 *   get:
 *     summary: Get a coupon by ID
 *     tags: [Coupon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the coupon
 *     responses:
 *       200:
 *         description: Coupon details
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getCouponById);

/**
 * @swagger
 * /api/coupon/{id}:
 *   patch:
 *     summary: Update a coupon by ID
 *     tags: [Coupon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the coupon to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: New coupon code
 *               discount:
 *                 type: number
 *                 description: New discount value
 *               expirationDate:
 *                 type: string
 *                 description: New expiration date of the coupon
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Server error
 */
router.patch('/:id', updateCoupon);

/**
 * @swagger
 * /api/coupon/{id}:
 *   delete:
 *     summary: Delete a coupon by ID
 *     tags: [Coupon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the coupon to delete
 *     responses:
 *       200:
 *         description: Coupon deleted successfully
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteCoupon);

module.exports = router;
