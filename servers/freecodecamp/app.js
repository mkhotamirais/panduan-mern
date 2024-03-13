const express = require("express");
const { port } = require("./config/constants.");
const app = express();
const cors = require("cors");
const db = require("./config");

app.use(cors());
// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: ['GET', "POST", "PUT", "PATCH", "DELETE"],
//   allowedHeaders: ['Content-Type']
// }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.status(200).send("mern freecodecamp home page");
});

app.use("/freecodecamp/v1/book", require("./app/v1/book/router"));

db.then(() => {
  console.log(`App connected to database`);
  app.listen(port, () => console.log(`App is listening to port ${port}`));
}).catch((err) => console.log(err));
