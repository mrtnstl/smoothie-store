const { Router } = require("express");
const webpageController = require("../controllers/webpageController");

const router = Router();

router.get("/", webpageController.renderHomePage);
router.get("/login", webpageController.renderLoginPage);
router.get("/register", webpageController.renderRegistrationPage);
router.get(
  "/profile",
  /* authMW */
  webpageController.renderProfilePage
);
router.get(
  "/moderator",
  /* authMW, accessControlMW([ROLES.moderator, ROLES.admin]) */
  webpageController.renderModeratorPage
);
router.get(
  "/admin",
  /* authMW, accessControlMW([ROLES.admin]) */
  webpageController.renderAdminPage
);

module.exports = router;
