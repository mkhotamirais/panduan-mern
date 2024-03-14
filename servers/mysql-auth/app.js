const express = require("express");
const { port } = require("./config/constants");
const cors = require("cors");
const app = express();
const path = require("path");
const conn = require("./config");
const cookieParser = require("cookie-parser");
const { credentials, corsOptions } = require("./config/cred");

// (async () => {
//   await conn.sync();
//   await UserToken.sync();
// })();

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/authToken", require("./app/authToken/auth/router"));
app.use("/usersToken", require("./app/authToken/user/router"));

app.use("*", (req, res) => {
  res.status(404).json({ message: "alamat url tidak ada atau salah" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "something broke" });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
