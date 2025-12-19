const URL = process.env.URL || "http://localhost";
const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smoothie Store API",
      version: "1.0.0",
      description: "API documentation for the Smoothie Store endpoints",
    },
    servers: [
      {
        url: `${URL}:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

module.exports.swaggerOptions = swaggerOptions;
