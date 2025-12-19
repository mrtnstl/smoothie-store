const { wildcardMW } = require("./wildcardMW");

describe("wildcardMW", () => {
  it("should return 404 message with URL when called", () => {
    const req = { url: "/nonexistent-resource" };
    const res = {
      status: 0,
      status: function (statusCode) {
        this.status = statusCode;
        return this;
      },
      json: function (data) {
        return {
          status: this.status,
          message: data,
        };
      },
    };
    const expected = { message: `Resource not found! ${req.url}` };
    const result = wildcardMW(req, res);

    expect(result.status).toBe(404);
    expect(result.message).toEqual(expected);
  });
});
