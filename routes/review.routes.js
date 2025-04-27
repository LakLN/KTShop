const express = require("express");
const router = express.Router();
const { addReview, deleteReviews } = require("../controller/review.controller");

/**
 * @swagger
 * /api/review/add:
 *   post:
 *     summary: Add a new review
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               userId:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 description: Rating out of 5
 *               reviewText:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review added successfully
 *       400:
 *         description: Bad request
 */
router.post("/add", addReview);

/**
 * @swagger
 * /api/review/delete/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete("/delete/:id", deleteReviews);

module.exports = router;
