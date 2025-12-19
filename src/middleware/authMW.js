module.exports.authMW = (req, res, next) => {
  console.log("auth middleware");
  const apiKey = "asd23f-4fagg25";
  if (!apiKey) {
    return res.status(401).json({ message: "Missing or invalid API key!" });
  }

  req.userId = "usr-1";
  return next();
};
