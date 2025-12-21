const Users = require("../models/Users");
const { randomUUID } = require("node:crypto");

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
