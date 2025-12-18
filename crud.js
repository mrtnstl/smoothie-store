const db = require("./database")

//create
const createItem = (email, password, _v, callback) => {
  const sql = `INSERT INTO users (email, password, _v) VALUES (?, ?, ?)`
  db.run(sql, [email, password, _v], function (err) {
    callback(err, { id: this.lastID })
  })
}

const readItems = (callback) => {
  const sql = "SELECT * FROM users"
  db.all(sql, [], callback)
}

const readItemsEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?"
  db.all(sql, email, callback)
}

const updateItem = (id, name, description, callback) => {
  const sql = "UPDATE users SET email=?, password=?, _v WHERE id = ?"
  db.run(sql, [email, password, id, _v++], callback)
}

const deleteItem = (id, callback) => {
  const sql = "DELETE FROM users WHERE id = ?"
  db.run(sql, id, callback)
}

module.exports = {
  createItem,
  readItems,
  updateItem,
  deleteItem,
  readItemsEmail,
}
