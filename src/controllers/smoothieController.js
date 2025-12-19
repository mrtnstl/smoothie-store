const Smoothies = require("../__mocks__/Smoothies");

module.exports.getSmoothies = (req, res) => {
  const smoothies = Smoothies.findMany();
  return res.status(200).json(smoothies);
};

module.exports.getRandomSmoothie = (req, res) => {
  const pseudoRandom = String(
    Math.floor(Math.random() * Smoothies.count() + 1)
  );
  const smoothieId = `SM-${pseudoRandom.padStart(3, "0")}`;

  const smoothieOfTheDay = Smoothies.findOne("id", smoothieId);
  if (!smoothieOfTheDay) {
    return res
      .status(404)
      .json({ message: `Something went wrong :( Cannot find smoothie` });
  }

  return res.status(200).json(smoothieOfTheDay);
};

module.exports.getSmoothieById = (req, res) => {
  const smoothieId = req.params.id;
  const smoothie = Smoothies.findOne("id", smoothieId);

  if (!smoothie) {
    return res
      .status(404)
      .json({ message: `Cannot find smoothie with the id of ${smoothieId}` });
  }

  return res.status(200).json(smoothie);
};
