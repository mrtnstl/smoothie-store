const sqlite3 = require("sqlite3").verbose()
const dbName = "database.db"

let db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.error(err.message)
  } else {
    console.log("Connected to DB!")
    //db.run("DROP TABLE items")
    db.run(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, _v INTEGER)",
      (err) => {
        if (err) {
          console.error(err.message)
        } else {
          console.log("Table created or already existed.")
        }
      }
    )
  }
})

module.exports = db
