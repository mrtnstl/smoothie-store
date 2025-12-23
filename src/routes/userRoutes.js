const { Router } = require("express");

const router = Router();
//registerUser,loginUser,logoutUser

router.post("/login", (req, res) => {
  return res.send("to be implemented");
});

module.exports = router;
