const express = require("express");
const { port, db } = require("./config/constants");
const app = express();
const cors = require("cors");
const Product = require("./app/product/model");

(async () => {
  //   await db.sync();
  await Product.sync();
})();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("homepage mysql-basic");
});

app.use("/products", require("./app/product/router"));

app.use("/*", (req, res) => {
  res.status(404).json({ message: "Url tidak ditemukan atau salah" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
