const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const { swaggerOptions } = require("./config/swagger");
const Database = require("./services/mongodbMemoryServer");

const smoothieRoutes = require("./routes/smoothieRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const { wildcardMW } = require("./middleware/wildcardMW");

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocs = swaggerJSDoc(swaggerOptions);
Database.connectDB();

app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");

// website routes

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// api routes
app.use(authRoutes);
app.use("/api/v1", smoothieRoutes);
app.use("/api/v1", userRoutes);

// catchall
app.use(wildcardMW);

const server = app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

// graceful shutdown logic
process.on("SIGINT", () => {
  server.close(() => {
    console.log("SIGINT signal recieved! Server closed!");
  });
  Database.disconnectDB();
});
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("SIGINT signal recieved! Server closed!");
  });
  Database.disconnectDB();
});
