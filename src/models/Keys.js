const mongoose = require("mongoose");
const { Schema } = mongoose;

const keySchema = new Schema(
  {
    ownerId: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    hitCount: { type: Number, default: 0 },
    isActive: { type: Boolean, required: true },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);
keySchema.statics.getHitCountByKey = async function (apiKey) {
  if (!apiKey) throw new Error("apiKey is required!");

  const key = await this.findOne({ key: apiKey, isActive: true });

  if (!key) throw new Error("apiKey not found!");

  return { hitCount: key.hitCount };
};
keySchema.statics.incrementHitCountWhereKey = async function (apiKey, value) {
  if (!apiKey) throw new Error("apiKey is required!");
  if (typeof value !== "number") throw new Error("value is not a number!");

  const updated = await this.findOneAndUpdate(
    { key: apiKey, isActive: true },
    { $inc: { hitCount: value } },
    { new: true }
  );

  if (!updated) throw new Error("apiKey not found!");
  console.log("NEW HIT COUNT", updated.hitCount);
  return { hitCount: updated.hitCount };
};

const Keys = mongoose.model("Keys", keySchema);

module.exports = Keys;
