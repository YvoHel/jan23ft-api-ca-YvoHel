const express = require('express');
const router = express.Router();
const jsend = require('jsend');

router.use(jsend.middleware);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login for registered users
 *     tags: [Users]
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
 *       '200':
 *         description: Successful login
 *       '401':
 *         description: Authentication failed
 */
router.post('/login', (req, res, next) => {
	return;
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
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
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Registration failed
 */
router.post('/signup', (req, res, next) => {
	return;
});

/**
 * @swagger
 * /users/fail:
 *   get:
 *     summary: Endpoint to demonstrate failed authentication
 *     tags: [Users]
 *     responses:
 *       '401':
 *         description: Authentication failed
 */
router.post('/login', (req, res, next) => {
	
	res.status(501).jsend.error({ message: "Not implemented" });
});

router.post('/signup', (req, res, next) => {
	
	res.status(501).jsend.error({ message: "Not implemented" });
});

router.get('/fail', (req, res) => {
	return res.status(401).jsend.error({ statusCode: 401, message: 'Authentication failed' });
});

module.exports = router;
