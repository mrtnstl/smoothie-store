const { Router } = require("express");
const router = Router();
const apikeyController = require("../controllers/apikeyController");
const { validateApiKeyMW } = require("../middleware/auth/validateApiKeyMW");
const { authMW } = require("../middleware/auth/authMW");
const { accessControlMW } = require("../middleware/auth/accessControlMW");
const { ROLES } = require("../constants/index");

router.post("/request-key", authMW, apikeyController.requestApiKey);
router.post(
  "/revoke-key",
  authMW,
  accessControlMW([ROLES.user, ROLES.moderator, ROLES.admin]),
  validateApiKeyMW,
  apikeyController.revokeApiKey
);

// TODO: users should access their available keys on platform only, separate router
router.get(
  "/keys",
  /* authMW */
  apikeyController.getOwnApiKeys
);

module.exports = router;
