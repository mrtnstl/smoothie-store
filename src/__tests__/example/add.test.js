const { add } = require("./add")

test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3)
})

test("adds 1 + '2' to throw error", () => {
  expect(() => add(1, "2")).toThrow(Error("Operands must be of type number!"))
})
