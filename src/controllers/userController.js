const { randomUUID } = require("node:crypto");
const Users = require("../models/Users");

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

module.exports.loginUser = async (req, res) => {
  return res.status(200).json({ message: "to be implemented" });
};

module.exports.logoutUser = async (req, res) => {
  return res.status(200).json({ message: "to be implemented" });
};
