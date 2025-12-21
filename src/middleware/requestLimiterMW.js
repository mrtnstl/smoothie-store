/**
 *  number of req / day limiter
 */
const Keys = require("../models/Keys");
const { REQUEST_LIMIT } = require("../constants/apiConstants");

module.exports.requestLimiterMW = async (req, res, next) => {
  try {
    const { hitCount } = await Keys.getHitCountByKey(res.locals.apiKey);
    if (hitCount >= REQUEST_LIMIT) {
      return res
        .status(400)
        .json({ message: "Your API usage limit hit the maximum threshold!" });
    }
    await Keys.incrementHitCountByKey(res.locals.apiKey);
  } catch (err) {
    return res.status(400).json({ message: `${err.message}` });
  }

  return next();
};
