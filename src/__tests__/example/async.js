module.exports.fetchData = async () => {
  const response = await fetch("url")
  const result = await response.json()
  return result
}
