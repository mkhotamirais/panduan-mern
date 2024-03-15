const express = require("express");
const { port } = require("./config/constants");
const cors = require("cors");
const app = express();
const path = require("path");
const conn = require("./config");
const cookieParser = require("cookie-parser");
const { credentials, corsOptions } = require("./config/cred");
const { logSuccess, logError } = require("./middleware/logger");
const User = require("./app/user/model");
const Product = require("./app/product/model");

// (async () => {
//   // await conn.sync();
//   // await User.sync();
//   // await Product.sync();
// })();

app.use(logSuccess);

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/mysql-auth/auth", require("./app/auth/router"));
app.use("/mysql-auth/user", require("./app/user/router"));
app.use("/mysql-auth/product", require("./app/product/router"));

app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) res.sendFile(path.join(__dirname, "views", "404.html"));
  else if (req.accepts("json")) res.json({ message: "404 Not Found" });
  else res.type("txt").send("404 Not Found");
});

app.use(logError);
app.use((err, req, res, next) => {
  res.status(500).json({ message: "something broke" });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
