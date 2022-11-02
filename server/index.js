const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const axios = require("axios");
const { User } = require("./models/models");
const verificationHandler = require("./utils/jwtverify.config");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

const db_connection = require("./config/dbconn.config");
db_connection();

// PERSONAL Routes:
const fetchRoute = require("./routes/fetch");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");

// PERSONAL Middlewares
app.use("/", fetchRoute);
app.use("/", loginRoute);
app.use("/", registerRoute);

// DEV TESTING:

// ADD

app.post("/api/:username/bookmark", (req, res) => {
  const username = req.params.username;
  const ticker = req.body.ticker;
  console.log(ticker);

  verificationHandler(req, res);

  try {
    User.find({ username: username }, async (err, doc) => {
      err && console.log(err);

      await doc[0].bookmarkList.unshift(ticker);

      await doc[0].save((err, updateUser) => {
        err ? console.log(err) : res.status(200).json(updateUser.bookmarkList);
      });
    });
  } catch {
    console.log("Invalid token");
  }
});

// REMOVE

app.patch("/api/:username/bookmark", (req, res) => {
  const username = req.params.username;
  const ticker = req.body.ticker;
  console.log(ticker);

  verificationHandler(req, res);

  try {
    User.find({ username: username }, async (err, doc) => {
      err && console.log(err);
      console.log(doc[0].bookmarkList);

      doc[0].bookmarkList = await doc[0].bookmarkList.filter(
        (tickerToFind) => tickerToFind !== ticker
      );
      console.log(doc[0].bookmarkList);

      await doc[0].save((err, updateUser) => {
        console.log(updateUser.bookmarkList);
        err ? console.log(err) : res.status(200).json(updateUser.bookmarkList);
      });
    });
  } catch {
    console.log("Invalid token");
  }

  //
});

// UNIVERSAL
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = { app };
