const { validateAPIKey } = require("../../utils/apiKeyOps");
const Keys = require("../../models/Keys");

module.exports.checkApiKey = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"] || undefined;
  if (typeof apiKey === "undefined") {
    return res
      .status(401)
      .json({ message: "Unauthorized request! Api key is missing!" });
  }

  // validate key shape and existence
  const { err, isValid } = await validateAPIKey(
    process.env.API_KEY_SECRET,
    apiKey
  );
  if (err !== null) {
    return res.status(401).json({ message: `Unauthorized request! ${err}` });
  }

  //check keystore for key, return err or true
  const isInStore = await Keys.findOne({ key: apiKey });
  if (!isInStore) {
    return res
      .status(404)
      .json({ message: "Unauthorized request! Key doesn't exist!" });
  }

  res.locals.apiKey = apiKey;
  return next();
};
