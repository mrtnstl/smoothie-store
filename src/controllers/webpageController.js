module.exports.renderHomePage = (req, res) => {
  return res.render("index");
};

module.exports.renderLoginPage = (req, res) => {
  return res.render("login");
};

module.exports.renderRegistrationPage = (req, res) => {
  return res.render("register");
};

module.exports.renderProfilePage = (req, res) => {
  return res.render("profile");
};

module.exports.renderModeratorPage = (req, res) => {
  return res.render("moderator");
};

module.exports.renderAdminPage = (req, res) => {
  return res.render("admin");
};
