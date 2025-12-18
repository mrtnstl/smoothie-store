const { Router } = require("express")
const smoothieController = require("../controllers/smoothieController")

const router = Router()
/**
 * @swagger
 * /smoothies:
 *   get:
 *     summary: Retrieve a list of smoothies
 *     responses:
 *       200:
 *         description: A list of smoothies
 */
router.get("/smoothies", smoothieController.getSmoothies)

module.exports = router
