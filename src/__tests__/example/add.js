function add(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Operands must be of type number!")
  }
  return a + b
}
module.exports.add = add
