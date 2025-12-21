const express = require("express");
const { initRoutes } = require("./routes/index");
const Database = require("./services/mongodbMemoryServer");
const { cleanupAndShutdown } = require("./utils/cleanupAndShutdown");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");

// connect to database
(async () => {
  try {
    await Database.connectDB();
  } catch (err) {
    console.log(err);
  }

  // INSERT TEST API KEY - DELETE THIS WHEN TESTED!
  const { genAPIKey } = require("./utils/apiKeyOps");
  const Keys = require("./models/Keys");

  try {
    const testKey = await genAPIKey(process.env.API_KEY_SECRET);
    console.log("TEST API KEY:", testKey);

    await Keys.insertOne({
      ownerId: "usr-1",
      key: testKey,
    });
  } catch (err) {
    console.log("ERR DURING TEST KEY GENERATION/INSERTION:", err.message);
  }
})();

// subscribe route handlers
initRoutes(app);

const server = app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

// graceful shutdown logic
process.on("SIGINT", () => cleanupAndShutdown("SIGINT", server, Database));
process.on("SIGTERM", () => cleanupAndShutdown("SIGTERM", server, Database));
