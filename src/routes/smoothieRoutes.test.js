const request = require("supertest");
const express = require("express");
const smoothieRoutes = require("./smoothieRoutes");
const Smoothies = require("../__mocks__/Smoothies");

beforeAll(() => {});

describe("Smoothie Routes", () => {
  const app = express();
  app.use(express.json());
  app.use(smoothieRoutes);

  describe("GET /smoothies", () => {
    it("should return the list of smoothies when called", async () => {
      const expected = await Smoothies.findMany();
      const response = await request(app).get("/smoothies");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toBeDefined();
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toEqual(expected);
    });
  });

  describe("GET /smoothie/random", () => {
    it("should return a random smoothie", async () => {
      const response = await request(app).get("/smoothie/random");

      expect(response.status).toBe(200);
      expect(response.body.id).toBeDefined();
      expect(response.body.name).toBeDefined();
      expect(response.body.description).toBeDefined();
      expect(response.body.ingredients).toBeDefined();
    });
  });

  describe("GET /smoothie/:id", () => {
    it("should return the smoothie of the specified ID", async () => {
      const id = "SM-024";
      const expected = await Smoothies.findOne("id", id);
      const response = await request(app).get(`/smoothie/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expected);
    });

    it("should return 404 if the there is no smoothie with the specified ID", async () => {
      const id = "nonexistent";
      const expected = { message: `Cannot find smoothie with the id of ${id}` };
      const response = await request(app).get(`/smoothie/${id}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expected);
    });
  });
});

afterAll(async () => {});
