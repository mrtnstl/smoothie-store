const { genAPIKey } = require("./apiKeyGenerator");

describe("API Key generator", () => {
  it("should return a 32 byte hex string with a 'x' byte prefix", () => {
    const vendorPrefix = process.env.API_KEY_SECRET;
    const prefLength = vendorPrefix.length;
    const key = genAPIKey(vendorPrefix);

    expect(key.slice(0, prefLength)).toBe(vendorPrefix);
    expect(key.slice(prefLength, key.length).length).toBe(64);
  });

  it("should throw Error when vendor secret is missing", () => {
    const vendorPrefix = "";
    expect(() => genAPIKey(vendorPrefix)).toThrow(
      Error("KeyGen Error! Missing vendor secret!")
    );
  });
});
