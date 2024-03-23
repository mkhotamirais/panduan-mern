var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const { decodeToken } = require("./app/mw");
const { credentials, corsOptions } = require("./config/origins");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(credentials);
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(decodeToken());

// pages
app.use("/eduwork/auth", require("./app/auth/router"));
app.use("/eduwork/user", require("./app/user/router"));
app.use("/eduwork/product", require("./app/product/router"));
app.use("/eduwork/category", require("./app/category/router"));
app.use("/eduwork/tag", require("./app/tag/router"));
app.use("/eduwork/delivery-address", require("./app/deliveryAddress/router"));
// app.use("/api", cartRouter);
// app.use("/api", orderRouter);
// app.use("/api", invoiceRouter);

// app.use('/', require("./routes/index"));
// app.use('/users', require("./routes/users"));

// // home
app.use("/", (req, res) => {
  res.render("index", {
    title: "Eduwork Api Service",
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
