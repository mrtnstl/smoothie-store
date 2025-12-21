const { validateAPIKey } = require("../../services/apiKeyOps");

module.exports.checkApiKey = async (req, res, next) => {
  console.log("checkApiKey middleware");
  const apiKey = req.headers["x-api-key"] || undefined;
  if (typeof apiKey === "undefined") {
    return res
      .status(401)
      .json({ message: "Unauthorized request! Api key is missing!" });
  }

  // validate key shape
  const { err, isValid } = await validateAPIKey(
    process.env.API_KEY_SECRET,
    apiKey
  );
  if (err !== null) {
    return res
      .status(401)
      .json({ message: "Unauthorized request! Api key is invalid!" });
  }
  // check existence in db??

  res.locals.apiKey = apiKey;
  return next();
};
