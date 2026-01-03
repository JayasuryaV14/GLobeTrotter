const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

require("./config/db");

app.get("/", (req, res) => {
  res.send("GlobeTrotter API running");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
