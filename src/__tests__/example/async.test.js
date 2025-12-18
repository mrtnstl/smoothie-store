const fetchData = require("./async")

jest.mock("fetch")

test("fetches data from api", async () => {
  const data = {
    userId: 1,
    id: 1,
    title: "this is a title",
    completed: true,
  }
  fetch.length.mockResolvedValue({ data })
  const result = await fetchData()
  expect(result).toEqual(data)
})
