const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")
const { swaggerOptions } = require("./config/swagger")

const smoothieRoutes = require("./routes/smoothieRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

app.use(express.static("public"))
app.use(express.json())

app.set("view engine", "ejs")

const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get("/", (req, res) => {
  res.render("home")
})

app.use(authRoutes)
app.use("/api/v1", smoothieRoutes)

app.listen(3000, () => {
  console.log("App started")
})
// website routes

// api routes
