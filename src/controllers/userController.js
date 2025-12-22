const { randomUUID } = require("node:crypto");
const Users = require("../models/Users");
const Keys = require("../models/Keys");
const { genAPIKey } = require("../utils/apiKeyOps");

module.exports.registerUser = async (req, res) => {
  const { name, email } = req.body || {};
  if (typeof name === "undefined" || typeof email === "undefined") {
    return res.status(400).json({ message: "Invalid request!" });
  }

  // TODO: validate and sanitize input before insert
  const newUser = {
    id: randomUUID(),
    name,
    email,
  };

  try {
    const result = await Users.insertOne(newUser);
    console.log(result);
    return res
      .status(201)
      .json({ message: `Hurray! Registered successfully! ${result}` });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};
module.exports.loginUser = (req, res) => {
  return res.status(200).json({ message: "to be implemented" });
};
module.exports.logoutUser = (req, res) => {
  return res.status(200).json({ message: "to be implemented" });
};

module.exports.requestApiKey = async (req, res) => {
  try {
    const newApiKey = await genAPIKey(process.env.API_KEY_SECRET);
    await Keys.insertOne({
      ownerId: "usr-1",
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
    const revokedKey = await Keys.findOneAndUpdate(
      { key: res.locals.apiKey, isActive: true },
      { $set: { isActive: false } },
      { new: true }
    );
    console.log("REVIKED KEY RECORD", revokedKey);
    return res.status(201).json({ message: `Key revoked successfully!` });
  } catch (err) {
    // TODO: return generic error message to user
    return res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports.getOwnApiKeys = (req, res) => {
  return res.status(200).json({ message: "to be implemented" });
};
