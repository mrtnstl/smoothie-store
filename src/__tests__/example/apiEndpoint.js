const express = require("express");

const app = express();
app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];
  res.json(users);
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

MediaSourceHandle.exports.app = app;
