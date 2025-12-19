const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const { swaggerOptions } = require("./config/swagger");

const smoothieRoutes = require("./routes/smoothieRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");

// website routes
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.render("home");
});

// api routes
app.use(authRoutes);
app.use("/api/v1", smoothieRoutes);

const server = app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

// graceful shutdown logic
process.on("SIGINT", () => {
  server.close(() => {
    console.log("SIGINT signal recieved! Server closed!");
  });
});
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("SIGINT signal recieved! Server closed!");
  });
});
