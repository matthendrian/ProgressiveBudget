const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/MyBudget" || 3000, {
  useNewUrlParser: true,
  useFindAndModify: false,
  retryWrites: true,
  w: "majority",
});

mongoose.Promise = global.Promise;
// routes
app.use(require("./routes/api.js"));
/*
var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);
*/

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});