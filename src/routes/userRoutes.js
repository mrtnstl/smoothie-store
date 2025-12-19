const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

// TODO: change to OAuth later
router.post("/register", userController.registerUser);

module.exports = router;
