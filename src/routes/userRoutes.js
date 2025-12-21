const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

// TODO: change to OAuth later
router.post("/register", userController.registerUser);
router.post("/request-key", userController.requestApiKey);

module.exports = router;
