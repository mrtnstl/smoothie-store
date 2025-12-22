const { Router } = require("express");
const userController = require("../controllers/userController");
const { validateApiKeyMW } = require("../middleware/auth/validateApiKeyMW");
const { accessControlMW } = require("../middleware/auth/accessControlMW");
const { ROLES } = require("../constants/index");

const router = Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post(
  "/logout",
  /* authMW */
  userController.logoutUser
);
router.post(
  "/request-key",
  /* authMW */
  userController.requestApiKey
);
router.post(
  "/revoke-key",
  /* authMW,*/
  accessControlMW([ROLES.user, ROLES.moderator, ROLES.admin]),
  validateApiKeyMW,
  userController.revokeApiKey
);

// TODO: users should access their available keys on platform only, separate router
router.get(
  "/keys",
  /* authMW */
  userController.getOwnApiKeys
);

module.exports = router;
