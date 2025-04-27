const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  updateStaff,
  changePassword,
  addStaff,
  getAllStaff,
  deleteStaff,
  getStaffById,
  forgetPassword,
  confirmAdminEmail,
  confirmAdminForgetPass,
} = require("../controller/admin.controller");

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Admin username
 *               password:
 *                 type: string
 *                 description: Admin password
 *               email:
 *                 type: string
 *                 description: Admin email
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/register", registerAdmin);

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Admin username
 *               password:
 *                 type: string
 *                 description: Admin password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/login", loginAdmin);

/**
 * @swagger
 * /api/admin/change-password:
 *   patch:
 *     summary: Change admin password
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.patch("/change-password", changePassword);

/**
 * @swagger
 * /api/admin/add:
 *   post:
 *     summary: Add a new staff member
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Staff added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/add", addStaff);

/**
 * @swagger
 * /api/admin/all:
 *   get:
 *     summary: Get all staff members
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all staff members
 *       500:
 *         description: Server error
 */
router.get("/all", getAllStaff);

/**
 * @swagger
 * /api/admin/forget-password:
 *   patch:
 *     summary: Admin forget password request
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin email to send reset link
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.patch("/forget-password", forgetPassword);

/**
 * @swagger
 * /api/admin/confirm-forget-password:
 *   patch:
 *     summary: Confirm reset password for admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Reset password token
 *               newPassword:
 *                 type: string
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.patch("/confirm-forget-password", confirmAdminForgetPass);

/**
 * @swagger
 * /api/admin/get/{id}:
 *   get:
 *     summary: Get a staff member by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the staff member
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff member found
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Server error
 */
router.get("/get/:id", getStaffById);

/**
 * @swagger
 * /api/admin/update-stuff/{id}:
 *   patch:
 *     summary: Update a staff member
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the staff member to be updated
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
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Staff updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Server error
 */
router.patch("/update-stuff/:id", updateStaff);

/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     summary: Delete a staff member by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the staff member to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff deleted successfully
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteStaff);

module.exports = router;
