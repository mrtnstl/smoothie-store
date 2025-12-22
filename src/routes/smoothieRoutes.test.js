const request = require("supertest");
const express = require("express");
const { readFile } = require("node:fs/promises");
const smoothieRoutes = require("./smoothieRoutes");
const Smoothies = require("../models/Smoothies");
const Keys = require("../models/Keys");

beforeAll(() => {
  // request api key

  (async () => {
    let SMOOTHIE_SEED;
    let smoothies;
    try {
      SMOOTHIE_SEED = await readFile("./src/data/SMOOTHIE_SEED.json");
      smoothies = JSON.parse(SMOOTHIE_SEED).smoothies;
      await Smoothies.insertMany(smoothies);
    } catch (err) {
      console.log(err);
    } finally {
      SMOOTHIE_SEED = null;
      smoothies = null;
    }
  })();
});

describe("Smoothie Routes", () => {
  const app = express();
  app.use(express.json());
  app.use(smoothieRoutes);

  describe("GET /smoothies", () => {
    it("should return the list of smoothies when called", async () => {
      const limit = 4;
      const page = 1;

      const skip = limit * (page - 1);
      const expected = await Smoothies.find(
        {},
        { id: true, name: true, description: true, ingredients: true }
      )
        .limit(limit)
        .skip(skip);
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
      const expected = await Smoothies.findOne({ id: id });
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

afterAll(async () => {
  // delete api key
});
