const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const { swaggerOptions } = require("../config/swagger");

const smoothieRoutes = require("./smoothieRoutes");
const userRoutes = require("./userRoutes");
const { wildcardMW } = require("../middleware/wildcardMW");
const { globalErrorHandlerMW } = require("../middleware/globalErrorHandlerMW");

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports.initRoutes = app => {
  // website routes
  app.get("/", (req, res) => {
    res.render("home");
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // api routes
  app.use("/api/v1", smoothieRoutes);
  app.use("/api/v1", userRoutes);

  // catchall
  app.use(wildcardMW);

  // error
  app.use(globalErrorHandlerMW);
};
