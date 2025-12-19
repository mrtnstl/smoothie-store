const { Router } = require("express");
const smoothieController = require("../controllers/smoothieController");
const { authMW } = require("../middleware/authMW");
const { requestLimiterMW } = require("../middleware/requestLimiterMW");

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Smoothies
 *   description: Smoothie retrieval operations
 */

/**
 * @swagger
 * /api/v1/smoothies:
 *   get:
 *     tags: [Smoothies]
 *     summary: Retrieve a list of smoothies
 *     responses:
 *       200:
 *         description: A list of smoothies
 */
router.get("/smoothies", smoothieController.getSmoothies);

/**
 * @swagger
 * /api/v1/smoothie/random:
 *   get:
 *     tags: [Smoothies]
 *     summary: Retrieve a random smoothie
 *     responses:
 *       200:
 *         description: A random smoothie
 */
router.get("/smoothie/random", smoothieController.getRandomSmoothie);

/**
 * @swagger
 * /api/v1/smoothie/:{id}:
 *   get:
 *     tags: [Smoothies]
 *     summary: Retrieve a smoothie by it's ID
 *     responses:
 *       200:
 *         description: A smoothie of given ID
 */
router.get(
  "/smoothie/:id",
  authMW,
  requestLimiterMW,
  smoothieController.getSmoothieById
);

module.exports = router;
