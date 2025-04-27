const express = require("express");
const {
  paymentIntent,
  addOrder,
  getOrders,
  updateOrderStatus,
  getSingleOrder,
} = require("../controller/order.controller");

// router
const router = express.Router();

/**
 * @swagger
 * /api/order/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: List of all orders
 *       500:
 *         description: Server error
 */
router.get("/orders", getOrders);

/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to fetch
 *     responses:
 *       200:
 *         description: Single order details
 *       404:
 *         description: Order not found
 */
router.get("/:id", getSingleOrder);

/**
 * @swagger
 * /api/order/create-payment-intent:
 *   post:
 *     summary: Create a payment intent
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The total payment amount for the order
 *               currency:
 *                 type: string
 *                 description: Currency type (e.g., "usd")
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Server error
 */
router.post("/create-payment-intent", paymentIntent);

/**
 * @swagger
 * /api/order/saveOrder:
 *   post:
 *     summary: Save an order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productList:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               totalPrice:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order saved successfully
 *       400:
 *         description: Invalid data provided
 *       500:
 *         description: Server error
 */
router.post("/saveOrder", addOrder);

/**
 * @swagger
 * /api/order/update-status/{id}:
 *   patch:
 *     summary: Update the status of an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to update status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status of the order (e.g., "shipped", "delivered")
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.patch("/update-status/:id", updateOrderStatus);

module.exports = router;
