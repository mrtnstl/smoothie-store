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
    apiUsage: {
      hitCount: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.incrementHitCountById = async function (userId) {
  if (!userId) throw new Error("userId is required!");

  const updated = await this.findOneAndUpdate(
    { id: userId },
    { $inc: { "apiUsage.hitCount": 1 } },
    { new: true }
  );

  if (!updated) throw new Error("User not found!");

  return { hitCount: updated.apiUsage.hitCount };
};

const User = mongoose.model("User", userSchema);

(async () => {
  try {
    await User.insertOne({
      id: "usr-1",
      name: "Bowser",
      email: "bwsrr@mail.com",
    });
  } catch (err) {
    console.log("Mongo hiba:", err.message);
  }
})();

module.exports = User;
