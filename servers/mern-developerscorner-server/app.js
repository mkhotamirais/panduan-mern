const express = require("express");
const { port } = require("./config/constants");
const db = require("./config");
const app = express();
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("home developers corner");
});

app.use("/v1/auth/", require("./app/v1/auth/router"));
app.use("/v1/user", require("./app/v1/user/router"));

app.use(notFound);
app.use(errorHandler);

db.then(() => {
  console.log(`connect to mongodb`);
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch((err) => console.log(err));
