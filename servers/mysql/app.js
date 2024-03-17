const express = require("express");
const { port, rootPath } = require("./config/constants");
const app = express();
const cors = require("cors");
const { logError, logSuccess } = require("./middleware/logger");
const { credentials, corsOptions } = require("../mongodb/config/origins");
const cookieParser = require("cookie-parser");
const path = require("path");
// const conn = require("./config");
// const V1Product = require("./app/v1/product/model");
// const V2Product = require("./app/v2/product/model");
// const V2User = require("./app/v2/user/model");

app.use(logSuccess);

// (async () => {
//   await conn.sync();
//   await V1Product.sync();
//   await V2Product.sync();
//   await V2User.sync();
// })();

app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootPath, "public")));

// home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// router
app.use("/mysql/v1/product", require("./app/v1/product/router"));
app.use("/mysql/v2/product", require("./app/v2/product/router"));
app.use("/mysql/v2/user", require("./app/v2/user/router"));

// errors
app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) res.sendFile(path.join(__dirname, "views", "404.html"));
  else if (req.accepts("json")) res.json({ message: "404 Not Found" });
  else res.type("txt").send("404 Not Found");
});

app.use(logError);

app.listen(port, () => console.log(`Server is running on port ${port}`));
