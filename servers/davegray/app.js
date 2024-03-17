const express = require("express");
const { port } = require("./config/constants");
const app = express();
const path = require("path");
const { logSuccess, logError } = require("./middleware/logger");
const { credentials, corsOptions } = require("./middleware/origins");
const cors = require("cors");
const { verifyToken } = require("./middleware/verifyAuth");
const cookieParser = require("cookie-parser");
const db = require("./config");

// ---middleware berjalan seperti air terjun dari atas ke bawah menggunakan app.use(middleware) jangan lupa next()

app.use(logSuccess);

// --- built-in middleware
app.use(credentials);
app.use(cors(corsOptions));
// mw for 'content-type: application/x-www-form-urlencoded' / form data
app.use(express.urlencoded({ extended: false }));
// mw for json
app.use(express.json());
// mw for serve static file (ex: public)
app.use(express.static(path.join(__dirname, "public")));
// mw for cookies
app.use(cookieParser());

app.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
// app.get("/newpage(.html)?", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "new-page.html"));
// });
// app.get("/oldpage(.html)?", (req, res) => {
//   res.redirect(301, "/newpage");
// });
// app.get("/subdir-page", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "subdir", "index.html"));
// });

app.use("/v0/employee", verifyToken, require("./app/v0/v0Employee/router"));
app.use("/v0/user", require("./app/v0/v0User/router"));
app.use("/v0/auth", require("./app/v0/v0Auth/router"));

app.use("/v1/auth", require("./app/v1/v1Auth/router"));
app.use("/v1/employee", require("./app/v1/v1Auth/router"));

app.use("/v2/user", require("./app/v2/v2User/router"));
app.use("/v2/auth", require("./app/v2/v2Auth/router"));
app.use("/v2/note", require("./app/v2/v2Note/router"));

// --- custom middleware
// const mw1 = (req, res, next) => {
//   req.nama = "ahmad";
//   next();
// };
// const mw2 = (req, res, next) => {
//   req.nama = "abdul";
//   req.umur = 20;
//   console.log(req.umur);
//   next();
// };
// app.use(mw1);
// app.use("/mw-a", mw2, (req, res) => {
//   res.json({
//     nama: req.nama,
//     message: "middleware mw1 dijalankan di semua endpoin di bawahnya, sedangkan mw2 hanya dijalankan di endpoin /mw-a",
//   });
// });
// app.use("/mw-b", (req, res) => {
//   res.json({ nama: req.nama });
// });

app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) res.sendFile(path.join(__dirname, "views", "404.html"));
  else if (req.accepts("json")) res.json({ message: "404 Not Found" });
  else res.type("txt").send("404 Not Found");
});

app.use(logError);

db.then(() => {
  console.log("Server connected to mongodb");
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch((error) => console.log(error));

// mongoose.connection.once("open", () => {
//   app.listen(port, () => log(`Server connected to mongodb and running on port ${port}`));
// });

// mongoose.connection.on("error", (error) => {
//   // logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
//   console.log(error);
// });
