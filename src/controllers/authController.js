const {
  createItem,
  readItems,
  updateItem,
  deleteItem,
  readItemsEmail,
} = require("../../crud")
const bcrypt = require("bcrypt")

module.exports.signup_get = (req, res) => {
  res.render("signup")
}

module.exports.login_get = (req, res) => {
  res.render("login")
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body
  let pwModify = password

  //data validation
  /**
   * Checking if the input validation have passed, if true, hash the password and create user in db
   *
   * @param {string} email The user email
   * @param {string} password The user passw. in plain text
   * @returns {string} If all passes the value is an empty string
   * @example
   * const a = "valami@domain.com"
   * const b = "userpassword123"
   *
   * const result = validateUserData(a, b)
   * console.log(result)
   * // It logs: ""
   *
   */
  function validateUserData(email, password) {
    let err = ""

    if (email.length === 0) {
      let err = "Email is required!!"
      return err
    } else {
      if (email.search("@") == -1) {
        let err = "This is not an email address!!"
        return err
      } else {
        if (password.length < 6) {
          //password is shorter than 6 character
          let err = "Password must be longer than 6 characters!!"
          return err
        } else {
          return err
        }
      }
    }
  }

  const validation = validateUserData(email, password)

  if (validation !== "") {
    console.log(err)
    res.status(400).json({ "error, user not created: ": validation })
  } else {
    console.log("Looks like your input is fine \U+1F44D")
    const salt = await bcrypt.genSalt()
    pwModify = await bcrypt.hash(pwModify, salt)

    createItem(email.toLowerCase(), pwModify, 0, (err, data) => {
      if (err) {
        console.log(err)
        res.status(400).send("error, user not created")
      } else {
        res.status(201).json(data)
      }
    })
  }

  /*const recordsToDelete = [1,2,3,12,13,14,15,16]
    recordsToDelete.map((record)=> {
        deleteItem(record, ()=>{
        console.log("item deleted")
        })
    })*/
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body

  console.log(email, password)
  res.send("user login")
}
