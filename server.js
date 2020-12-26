const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cors = require("cors");
require("dotenv").config();

const db = process.env.DB_CONNECT;
const app = express();
app.use(express.json());
app.use(cors());

const users = require("./api/routes/users");
const movies = require("./api/routes/movies");

//making express use the router
app.use("/api/users", users);
app.use("/api/movies", movies);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log("The Server has started on: " + PORT));

mongoose.connect(
  db,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("Mongo Db Connected");
  }
);
