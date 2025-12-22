const express = require("express");
const cron = require("node-cron");
const ApiAccessCache = require("./services/inProcessCache");
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

// TODO: init cache here
console.log(ApiAccessCache.getStore());

// subscribe route handlers
initRoutes(app);

// cache cleanup scheduled task
const cacheEvictionTask = cron.schedule(
  "*/5 * * * * *",
  async () => {
    console.log(`[${new Date().toISOString()}] scheduled task called!`);
    const deletedItemCount = await ApiAccessCache.evictItemsOlderThan(
      1000 * 60
    );
    console.log(
      `[${new Date().toISOString()}] scheduled task ended! ${deletedItemCount} item were deleted from api key access cache!`
    );
  },
  {
    timezone: "Europe/Budapest",
    noOverlap: true,
  }
);
cacheEvictionTask.on("execution:failed", ctx => {
  console.log(
    `[${new Date().toISOString()}] task failed, id: ${ctx.task?.id}, ${ctx.execution?.error?.message}`
  );
});
console.log(cacheEvictionTask.getStatus());

// start server
const server = app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] App is listening on port ${PORT}`);
});

// graceful shutdown logic
process.on("SIGINT", () =>
  cleanupAndShutdown("SIGINT", server, Database, cacheEvictionTask)
);
process.on("SIGTERM", () =>
  cleanupAndShutdown("SIGTERM", server, Database, cacheEvictionTask)
);
