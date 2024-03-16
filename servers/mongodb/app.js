const express = require("express");
const { port, rootPath } = require("./config/constants");
const app = express();
const path = require("path");
const { logSuccess, logError } = require("./middleware/logger");
const db = require("./config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { corsOptions, credentials } = require("./config/origins");
const { verifyToken } = require("./middleware/verifyAuth");

app.use(logSuccess);

app.use(cookieParser());
// app.use(credentials);
// app.use(cors(corsOptions));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootPath, "public")));
// cookie parser untuk refresh token dan mendapat get cookie

// home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// router
app.use("/mongodb/v1/product", require("./app/v1/product/router"));
app.use("/mongodb/v2/product", require("./app/v2/product/router"));
app.use("/mongodb/v2/category", require("./app/v2/category/router"));
app.use("/mongodb/v3/product", require("./app/v3/products/router"));
app.use("/v4/user", require("./app/v4/user/router"));
app.use("/v4/auth", require("./app/v4/auth/router"));
app.use("/v4/product", require("./app/v4/product/router"));

// errors
app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) res.sendFile(path.join(__dirname, "views", "404.html"));
  else if (req.accepts("json")) res.json({ message: "404 Not Found" });
  else res.type("txt").send("404 Not Found");
});

app.use(logError);

db.then(() => {
  console.log(`Server connect to mongodb`);
  app.listen(port, () => console.log(`Server is running on port ${port}`));
}).catch((err) => console.log(err));
