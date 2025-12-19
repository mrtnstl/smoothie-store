const Smoothies = require("../__mocks__/Smoothies");
const Smoothie = require("../models/Smoothie");

module.exports.getSmoothies = async (req, res) => {
  const smoothies = await Smoothies.findMany();
  return res.status(200).json(smoothies);
};

module.exports.getRandomSmoothie = async (req, res) => {
  const maxCount = await Smoothies.count();
  const pseudoRandom = String(Math.floor(Math.random() * maxCount + 1));

  const smoothieId = `SM-${pseudoRandom.padStart(3, "0")}`;

  const randomSmoothie = await Smoothies.findOne("id", smoothieId);
  if (!randomSmoothie) {
    return res
      .status(404)
      .json({ message: `Something went wrong :( Cannot find smoothie` });
  }

  return res.status(200).json(randomSmoothie);
};

module.exports.getSmoothieById = async (req, res) => {
  const smoothieId = req.params.id;
  const smoothie = await Smoothie.findOne({ id: smoothieId });

  if (!smoothie) {
    return res
      .status(404)
      .json({ message: `Cannot find smoothie with the id of ${smoothieId}` });
  }

  return res.status(200).json(smoothie);
};
