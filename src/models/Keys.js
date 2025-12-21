const mongoose = require("mongoose");
const { Schema } = mongoose;

const keySchema = new Schema(
  {
    ownerId: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    hitCount: { type: Number, default: 0 },
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

  const key = await this.findOne({ key: apiKey });

  if (!key) throw new Error("apiKey not found!");

  return { hitCount: key.hitCount };
};
keySchema.statics.incrementHitCountByKey = async function (apiKey) {
  if (!apiKey) throw new Error("apiKey is required!");

  const updated = await this.findOneAndUpdate(
    { key: apiKey },
    { $inc: { hitCount: 1 } },
    { new: true }
  );

  if (!updated) throw new Error("apiKey not found!");
  console.log("NEW HIT COUNT", updated.hitCount);
  return { hitCount: updated.hitCount };
};

const Keys = mongoose.model("Keys", keySchema);

(async () => {
  try {
    await Keys.insertOne({
      ownerId: "usr-1",
      key: "my-very-unique-api-key",
    });
  } catch (err) {
    console.log("Mongo hiba:", err.message);
  }
})();

module.exports = Keys;
