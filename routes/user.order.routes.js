const express = require('express');
const router = express.Router();
const userOrderController = require('../controller/user.order.controller');
const verifyToken = require('../middleware/verifyToken');

/**
 * @swagger
 * /api/user-order/dashboard-amount:
 *   get:
 *     summary: Get dashboard amount
 *     tags: [UserOrder]
 *     responses:
 *       200:
 *         description: Dashboard amount fetched successfully
 */
router.get('/dashboard-amount', userOrderController.getDashboardAmount);

/**
 * @swagger
 * /api/user-order/sales-report:
 *   get:
 *     summary: Get sales report
 *     tags: [UserOrder]
 *     responses:
 *       200:
 *         description: Sales report fetched successfully
 */
router.get('/sales-report', userOrderController.getSalesReport);

/**
 * @swagger
 * /api/user-order/most-selling-category:
 *   get:
 *     summary: Get most selling category
 *     tags: [UserOrder]
 *     responses:
 *       200:
 *         description: Most selling category fetched successfully
 */
router.get('/most-selling-category', userOrderController.mostSellingCategory);

/**
 * @swagger
 * /api/user-order/dashboard-recent-order:
 *   get:
 *     summary: Get recent orders for dashboard
 *     tags: [UserOrder]
 *     responses:
 *       200:
 *         description: Recent orders fetched successfully
 */
router.get('/dashboard-recent-order', userOrderController.getDashboardRecentOrder);

/**
 * @swagger
 * /api/user-order/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [UserOrder]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order details fetched successfully
 */
router.get('/:id', userOrderController.getOrderById);

/**
 * @swagger
 * /api/user-order/:
 *   get:
 *     summary: Get all orders by a user
 *     tags: [UserOrder]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User orders fetched successfully
 */
router.get('/', verifyToken, userOrderController.getOrderByUser);

module.exports = router;
