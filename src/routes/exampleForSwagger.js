/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         age:
 *           type: integer
 *           description: The user's age
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 */

// tagging

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management operations
 */

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [User]
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */

// auth

/**
 * @swagger
 * security:
 *   - apiKey: []
 *
 * components:
 *   securitySchemes:
 *     apiKey:
 *       type: apiKey
 *       name: x-api-key
 *       in: header
 */
