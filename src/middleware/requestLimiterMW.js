/**
 *  number of req / day limiter
 */
const Keys = require("../models/Keys");
const ApiAccessCache = require("../services/inProcessCache");
const { REQUEST_LIMIT } = require("../constants/apiConstants");

module.exports.requestLimiterMW = async (req, res, next) => {
  try {
    const cachedHitCount = await ApiAccessCache.getItem(res.locals.apiKey);
    if (cachedHitCount >= REQUEST_LIMIT) {
      return res
        .status(400)
        .json({ message: "Your API usage limit hit the maximum threshold!" });
    }

    await Keys.incrementHitCountWhereKey(res.locals.apiKey, 1);
    await ApiAccessCache.setItem(res.locals.apiKey, cachedHitCount + 1);
  } catch (err) {
    return res.status(400).json({ message: `${err.message}` });
  }

  return next();
};
