module.exports.wildcardMW = (req, res) => {
  const url = req.url;
  return res.status(404).json({ message: `Resource not found! ${url}` });
};
