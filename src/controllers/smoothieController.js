const Smoothies = require("../models/Smoothies");

module.exports.getSmoothies = async (req, res) => {
  const smoothies = await Smoothies.find(
    {},
    { id: true, name: true, description: true, ingredients: true }
  );
  return res.status(200).json(smoothies);
};

module.exports.getRandomSmoothie = async (req, res) => {
  const maxCount = await Smoothies.countDocuments();
  const pseudoRandom = String(Math.floor(Math.random() * maxCount + 1));

  const smoothieId = `SM-${pseudoRandom.padStart(3, "0")}`;

  const randomSmoothie = await Smoothies.findOne(
    { id: smoothieId },
    { id: true, name: true, description: true, ingredients: true }
  );
  if (!randomSmoothie) {
    return res
      .status(404)
      .json({ message: `Something went wrong :( Cannot find smoothie` });
  }

  return res.status(200).json(randomSmoothie);
};

module.exports.getSmoothieById = async (req, res) => {
  const smoothieId = req.params.id;
  const smoothie = await Smoothies.findOne({ id: smoothieId });

  if (!smoothie) {
    return res
      .status(404)
      .json({ message: `Cannot find smoothie with the id of ${smoothieId}` });
  }

  return res.status(200).json(smoothie);
};
