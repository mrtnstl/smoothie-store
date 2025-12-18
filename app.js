const express = require("express")
const authRoutes = require("./src/routes/authRoutes")

const app = express()

app.use(express.static("public"))
app.use(express.json())

app.set("view engine", "ejs")

app.listen(3000, () => {
  console.log("App started")
})

app.get("/", (req, res) => {
  res.render("home")
})

app.get("/smoothies", (req, res) => {
  res.render("smoothies")
})

app.use(authRoutes)

// website routes

// api routes
