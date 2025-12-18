const { Router } = require("express")
const smoothieController = require("../controllers/smoothieController")

const router = Router()

router.get("/smoothies", smoothieController.getSmoothies)

module.exports = router
