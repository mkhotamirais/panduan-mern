const express = require("express");
const { port } = require("./config/constants");
const app = express();
const path = require("path");
const cors = require("cors");
const conn = require("./config");
// const User = require("./app/user/model");
// const Product = require("./app/products/model");

// (async () => {
//   await conn.sync();
//   await User.sync();
//   await Product.sync();
// })();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/products", require("./app/products/router"));
app.use("/users", require("./app/user/router"));

app.use("*", (req, res) => {
  res.status(404).json({ message: "Url tidak ditemukan atau salah" });
});

app.use((err, req, res, next) => {
  res.status(500).send("Something broke");
});

app.listen(port, () => console.log(`App is listening on port ${port}`));
