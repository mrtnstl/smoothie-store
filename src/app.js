const express = require("express");
const cron = require("node-cron");
const ApiAccessCache = require("./services/inProcessCache");
const { initRoutes } = require("./routes/index");
const Database = require("./services/mongodbMemoryServer");
const { cleanupAndShutdown } = require("./utils/cleanupAndShutdown");

const { EVICT_CACHE_AFTER, ROLES } = require("./constants/index");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");

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
      isActive: true,
      role: ROLES.user,
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
    const start = Date.now();
    const deletedItemCount =
      await ApiAccessCache.evictItemsOlderThan(EVICT_CACHE_AFTER);

    console.log(
      `[${new Date().toISOString()}] scheduled task ended! ${deletedItemCount} item were deleted from api key access cache under ${Date.now() - start} seconds!`
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
