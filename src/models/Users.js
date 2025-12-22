/**
 *  TODO: migrate User model to persistent storage
 *
 *  id: UUID
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const Users = mongoose.model("Users", userSchema);

(async () => {
  try {
    await Users.insertOne({
      id: "usr-1",
      name: "Bowser",
      email: "bwsrr@mail.com",
    });
  } catch (err) {
    console.log("Mongo hiba:", err.message);
  }
})();

module.exports = Users;
