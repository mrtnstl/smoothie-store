const Keys = require("../models/Keys");
const { genAPIKey } = require("../utils/apiKeyOps");
const { ROLES } = require("../constants/index");

module.exports.requestApiKey = async (req, res) => {
  try {
    const newApiKey = await genAPIKey(process.env.API_KEY_SECRET);
    await Keys.insertOne({
      ownerId: req.user.id,
      key: newApiKey,
      isActive: true,
    });
    return res
      .status(201)
      .json({ message: `Your brand new key: ${newApiKey}` });
  } catch (err) {
    // TODO: return generic error message to user
    return res.status(err.status || 500).json({ message: `${err.message}` });
  }
};

module.exports.revokeApiKey = async (req, res) => {
  try {
    const keyToRevoke = await Keys.findOne({
      key: res.locals.apiKey,
      isActive: true,
    });
    if (!keyToRevoke) {
      return res
        .status(404)
        .json({ message: "Key wasn't found or not active!" });
    }

    const isOwnKey = keyToRevoke.ownerId === req.user.id;
    if (
      !isOwnKey &&
      (req.user.role !== ROLES.moderator || req.user.role !== ROLES.admin)
    ) {
      return res.status(401).json({ message: "Unauthorized request!" });
    }

    const revokedKey = await Keys.findOneAndUpdate(
      { key: res.locals.apiKey, isActive: true },
      { $set: { isActive: false } },
      { new: true }
    );
    if (!revokedKey) {
      return res
        .status(404)
        .json({ message: "Key wasn't found or not active!" });
    }
    return res.status(201).json({ message: `Key revoked successfully!` });
  } catch (err) {
    // TODO: return generic error message to user
    return res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports.getOwnApiKeys = async (req, res) => {
  return res.status(200).json({ message: "to be implemented" });
};
