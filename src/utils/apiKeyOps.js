/**
 * api keys consist of a vendor prefix and a 32 byte hex string
 * the prefix helps the system determine if the key is issued by it, and reject early if its alien
 *
 */

const { randomBytes } = require("node:crypto");

const genAPIKey = vendorSecret => {
  return new Promise((resolve, reject) => {
    if (!vendorSecret) {
      reject("KeyGen Error! Missing vendor secret!");
    }
    try {
      const key = randomBytes(32).toString("hex");
      const assembledKey = `${vendorSecret}${key}`;
      resolve(assembledKey);
    } catch (err) {
      reject(err.message);
    }
  });
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

  return { err: null, isValid: true };
};

const revokeAPIKey = async apiKey => {
  // revoke logic
};

module.exports = { genAPIKey, validateAPIKey, revokeAPIKey };
