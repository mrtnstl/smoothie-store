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

module.exports.requestApiKey = async (req, res) => {
  try {
    const newApiKey = await genAPIKey(process.env.API_KEY_SECRET);
    await Keys.insertOne({
      ownerId: "usr-1",
      key: newApiKey,
    });
    return res
      .status(201)
      .json({ message: `Your brand new key: ${newApiKey}` });
  } catch (err) {
    // TODO: return generic error message to user
    return res.status(400).json({ message: `${err.message}` });
  }
};
