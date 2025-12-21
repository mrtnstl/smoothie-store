/**
 * api keys consist of a vendor prefix and a 32 byte hex string
 * the prefix helps the system determine if the key is issued by it, and reject early if its alien
 *
 */

const { randomBytes } = require("node:crypto");
const Keys = require("../models/Keys");

const genAPIKey = async vendorSecret => {
  // TODO: return Promise!!!
  if (!vendorSecret) {
    throw new Error("KeyGen Error! Missing vendor secret!");
  }

  const key = randomBytes(32).toString("hex");
  const assembledKey = `${vendorSecret}${key}`;
  return assembledKey;
};

const validateAPIKey = async (vendorSecret, apiKey) => {
  // check prefix, return err
  if (apiKey.slice(0, vendorSecret.length) !== vendorSecret) {
    return { err: "Invalid key!", isValid: false };
  }
  //check key length, return err
  if (apiKey.length !== vendorSecret.length + 64) {
    return { err: "Invalid key!", isValid: false };
  }
  //check keystore for key, return err or true
  const isInStore = await Keys.findOne({ apiKey: apiKey });
  if (!isInStore) {
    return { err: "Key doesn't exist!", isValid: false };
  }

  return { err: null, isValid: true };
};

const revokeAPIKey = async apiKey => {
  // revoke logic
};

module.exports = { genAPIKey, validateAPIKey, revokeAPIKey };
