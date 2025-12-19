/**
 *  Smoothie model will be seeded on every startup because the collection is stored in memory by design
 *  TODO: observe this behavior, may backfire longterm!
 *
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { readFile } = require("node:fs/promises");

const smoothieSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String }],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const Smoothie = mongoose.model("Smoothie", smoothieSchema);

(async () => {
  let SMOOTHIE_SEED;
  let smoothies;
  try {
    SMOOTHIE_SEED = await readFile("./src/data/SMOOTHIE_SEED.json");
    smoothies = JSON.parse(SMOOTHIE_SEED).smoothies;
    await Smoothie.insertMany(smoothies);
  } catch (err) {
    console.log(err);
  } finally {
    SMOOTHIE_SEED = null;
    smoothies = null;
  }
})();

module.exports = Smoothie;
