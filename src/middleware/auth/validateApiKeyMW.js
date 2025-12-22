/**
 * validateApiKeyMW
 *
 * this middleware gets the ami key from x-api-key header,
 * validates the shape of the key,
 * checks if it is in the database with the isActive attribute equals true,
 * puts api key on res.locals.apiKey
 *
 */
const { validateAPIKey } = require("../../utils/apiKeyOps");
const Keys = require("../../models/Keys");

module.exports.validateApiKeyMW = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"] || undefined;
  if (typeof apiKey === "undefined") {
    return res
      .status(401)
      .json({ message: "Unauthorized request! Api key is missing!" });
  }

  const { err, isValid } = await validateAPIKey(
    process.env.API_KEY_SECRET,
    apiKey
  );
  if (err !== null) {
    return res.status(401).json({ message: `Unauthorized request! ${err}` });
  }

  const isInStore = await Keys.findOne({ key: apiKey, isActive: true });
  if (!isInStore) {
    return res
      .status(404)
      .json({ message: "Unauthorized request! Key doesn't exist!" });
  }

  res.locals.apiKey = apiKey;
  return next();
};
