/**
 * api keys consist of a vendor prefix and a 32 byte hex string
 * the prefix helps the system determine if the key is issued by it, and reject early if its alien
 *
 */

const { randomBytes } = require("node:crypto");

const genAPIKey = vendorSecret => {
  if (!vendorSecret) {
    throw new Error("KeyGen Error! Missing vendor secret!");
  }

  const key = randomBytes(32).toString("hex");
  const assembledKey = `${vendorSecret}${key}`;
  return assembledKey;
};

module.exports.genAPIKey = genAPIKey;
