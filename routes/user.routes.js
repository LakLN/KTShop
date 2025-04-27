const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

/**
 * @swagger
 * /api/user/test:
 *   get:
 *     summary: Test API
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/test', (req, res) => {
  res.send('Test successful');
});

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/signup", userController.signup);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post("/login", userController.login);

/**
 * @swagger
 * /api/user/forget-password:
 *   patch:
 *     summary: Request password reset
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent
 */
router.patch('/forget-password', userController.forgetPassword);

/**
 * @swagger
 * /api/user/confirm-forget-password:
 *   patch:
 *     summary: Confirm password reset
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
router.patch('/confirm-forget-password', userController.confirmForgetPassword);

/**
 * @swagger
 * /api/user/change-password:
 *   patch:
 *     summary: Change password for logged-in user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
 */
router.patch('/change-password', userController.changePassword);

/**
 * @swagger
 * /api/user/confirmEmail/{token}:
 *   get:
 *     summary: Confirm user email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Confirmation token
 *     responses:
 *       200:
 *         description: Email confirmed successfully
 */
router.get('/confirmEmail/:token', userController.confirmEmail);

/**
 * @swagger
 * /api/user/update-user/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
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
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put('/update-user/:id', userController.updateUser);

/**
 * @swagger
 * /api/user/register/{token}:
 *   post:
 *     summary: Register or login with Google
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Google OAuth token
 *     responses:
 *       200:
 *         description: User registered or logged in successfully
 */
router.post("/register/:token", userController.signUpWithProvider);

module.exports = router;
