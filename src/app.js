const express = require("express");
const { initRoutes } = require("./routes/index");
const Database = require("./services/mongodbMemoryServer");
const { cleanupAndShutdown } = require("./utils/cleanupAndShutdown");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");

try {
  Database.connectDB();
} catch (err) {
  console.log(err);
}

initRoutes(app);

const server = app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

// graceful shutdown logic
process.on("SIGINT", () => cleanupAndShutdown("SIGINT", server, Database));
process.on("SIGTERM", () => cleanupAndShutdown("SIGTERM", server, Database));
