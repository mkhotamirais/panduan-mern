const express = require("express");
const { port, rootPath } = require("./config/constants");
const cors = require("cors");
const app = express();
const path = require("path");
const conn = require("./config");
const User = require("./app/user/model");

// (async () => {
//   await conn.sync();
//   await User.sync();
// })();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/users", require("./app/user/router"));

app.use("/*", (req, res) => {
  res.status(404).json({ message: "Url tidak ditemukan atau salah" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => console.log(`App is running on port ${port}`));
