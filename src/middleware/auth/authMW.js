module.exports.authMW = (req, res, next) => {
  console.log("auth middleware");
  const apiKey = "asd23f-4fagg25";
  if (!apiKey) {
    return res.status(401).json({ message: "Missing or invalid API key!" });
  }
  req.user = {
    id: "some-usr-253",
    name: "Luigi",
    email: "lou@mail.email",
    role: "user",
  };
  //req.userId = "usr-1";
  return next();
};
