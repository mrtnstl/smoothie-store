module.exports.getSmoothies = (req, res) => {
  const smoothies = ["sm1", "sm2", "sm3"]
  return res.status(200).json(smoothies)
}
