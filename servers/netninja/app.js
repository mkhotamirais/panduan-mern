const express = require("express");
const { port } = require("./config/constants");
const app = express();
const cors = require("cors");
const db = require("./config");
const { verifyAuth } = require("./middleware/verifyAuth");

app.get("/", (req, res) => {
  res.send(`homepage mern netninja`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/netninja/v1/workouts", verifyAuth, require("./app/v1/workouts/router"));
app.use("/netninja/v1/auth", require("./app/v1/auth/router"));

app.all("*", (req, res) => {
  res.send("homepage netninja server");
});

db.then(() => {
  console.log(`Connected to mongodb`);
  app.listen(port, () => console.log(`Server is running on port ${port}`));
}).catch((error) => console.log(error));
