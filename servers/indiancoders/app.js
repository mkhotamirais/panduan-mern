const express = require("express");
const { port } = require("./config/constants");
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
// app.use(cookieParser())

app.use("/users", require("./app/users/router"));

app.use("/", (req, res) => {
  res.send("home indian coders");
});

db.then(() => {
  console.log("Mongo database connected");
  app.listen(port, () => console.log(`App running on port ${port}`));
}).catch((err) => {
  console.log(err.message);
});
