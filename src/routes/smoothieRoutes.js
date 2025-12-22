const { Router } = require("express");
const smoothieController = require("../controllers/smoothieController");
const { validateApiKeyMW } = require("../middleware/auth/validateApiKeyMW");
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
router.get(
  "/smoothies",
  validateApiKeyMW,
  requestLimiterMW,
  smoothieController.getSmoothies
);

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
router.get(
  "/smoothie/random",
  validateApiKeyMW,
  requestLimiterMW,
  smoothieController.getRandomSmoothie
);

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
  validateApiKeyMW,
  requestLimiterMW,
  smoothieController.getSmoothieById
);

module.exports = router;
