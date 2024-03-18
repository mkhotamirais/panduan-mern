const express = require("express");
const { port, rootPath } = require("./config/constants");
const app = express();
const cors = require("cors");
const { logError, logSuccess } = require("./middleware/logger");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const { sessionOptions } = require("./config/sessionOptions");
const SequelizeStore = require("connect-session-sequelize");
const conn = require("./config");
const { verifyUserSess, adminOnlySess } = require("./middleware/verifyAuthSession");
const { credentials, corsOptions } = require("./config/cred");
const { verifyToken, adminOnlyV4 } = require("./middleware/verifyAuthToken");
// const V4User = require("./app/v4/user/model");
// const V4Product = require("./app/v4/product/model");
// const V5Product = require("./app/v5/product/model");
// const V5User = require("./app/v5/user/model");
// const V3Product = require("./app/v3/product/model");
// const V1Product = require("./app/v1/product/model");
// const V2Product = require("./app/v2/product/model");
// const V2User = require("./app/v2/user/model");

app.use(logSuccess);

// (async () => {
//   // await conn.sync();
//   // await V1Product.sync();
//   // await V2Product.sync();
//   // await V2User.sync();
//   // await V3Product.sync();
//   // await V4User.sync();
//   // await V4Product.sync();
//   // await V5Product.sync();
//   // await V5User.sync();
// })();

// tingkat otentikasi
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ db: conn });
app.use(session(sessionOptions(store)));
// store.sync();

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
app.use("/mysql/v3/product", require("./app/v3/product/router"));
app.use("/mysql/v4/auth", require("./app/v4/auth/router"));
app.use("/mysql/v4/user", verifyToken, adminOnlyV4, require("./app/v4/user/router"));
app.use("/mysql/v4/product", verifyToken, require("./app/v4/product/router"));
app.use("/mysql/v5/auth", require("./app/v5/auth/router"));
app.use("/mysql/v5/user", verifyUserSess, adminOnlySess, require("./app/v5/user/router"));
app.use("/mysql/v5/product", verifyUserSess, require("./app/v5/product/router"));

// errors
app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) res.sendFile(path.join(__dirname, "views", "404.html"));
  else if (req.accepts("json")) res.json({ message: "404 Not Found" });
  else res.type("txt").send("404 Not Found");
});

app.use(logError);

app.listen(port, () => console.log(`Server is running on port ${port}`));
