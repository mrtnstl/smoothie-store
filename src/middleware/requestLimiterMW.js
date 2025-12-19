/**
 *  number of req / day limiter
 */
const User = require("../models/User");
const MAX_HIT_COUNT = 10;

module.exports.requestLimiterMW = async (req, res, next) => {
  console.log("request limit middleware");

  try {
    const { hitCount } = await User.incrementHitCountById(req.userId);
    if (hitCount > MAX_HIT_COUNT) {
      return res
        .status(200)
        .json({ message: "Your API usage limit hit the maximum threshold!" });
    }
  } catch (err) {
    return next(err);
  }

  return next();
};
