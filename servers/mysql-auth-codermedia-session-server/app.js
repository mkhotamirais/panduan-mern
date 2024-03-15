const express = require("express");
const { port } = require("./config/constants");
const morgan = require("morgan");
const app = express();
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const { sessionOptions } = require("./config/sessionOptions");
const SequelizeStore = require("connect-session-sequelize");
const db = require("./config");
const { verifyUser, adminOnly } = require("./app/mw");

app.use(morgan("tiny"));

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ db });

app.use(session(sessionOptions(store)));
// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/auth", require("./app/auth/router"));
app.use("/users", verifyUser, adminOnly, require("./app/user/router"));
app.use("/products", verifyUser, require("./app/product/router"));

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: "something broke" });
});

// (async () => {
//   await db.sync();
// })();
// store.sync();

app.listen(port, () => console.log(`App is listening to port ${port}`));
