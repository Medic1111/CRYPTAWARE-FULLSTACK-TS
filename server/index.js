const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
const { User } = require("./models/models");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

mongoose.connect(`${process.env.DB_URI}`, (err) =>
  err ? console.log(err) : console.log("DB CONNECTED")
);

// PERSONAL Routes:
const fetchRoute = require("./routes/fetch");
// AUTHENTICATION: Login/Register: Bcrypt and Send Token

// PERSONAL Middlewares
app.use("/", fetchRoute);

app.post("/api/v1/register", (req, res) => {
  const { email, username, password } = req.body.user;

  User.findOne(
    { $or: [{ username: username }, { email: email }] },
    (err, doc) => {
      if (err) {
        return res.status(500).json({ message: "Oops, something went wrong" });
      }

      if (doc) {
        return res
          .status(409)
          .json({ message: "Username or Email already registered" });
      }

      const hash = bcrypt.hashSync(password, 10);
      const newUser = new User({
        email,
        username,
        password: hash,
      });

      newUser.save((err, doc) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Oops, something went wrong" });
        }

        let token = jwt.sign({ username }, `${process.env.TOKEN_SECRET}`, {
          expiresIn: "600s",
        });

        res.status(201).json({
          username: doc.username,
          bookmarkList: doc.bookmarkList,
          notes: doc.notes,
          token,
        });
      });
    }
  );
});

app.post("/api/v1/login", (req, res) => {
  const { email, username, password } = req.body.user;
  User.findOne({ username: username }, (err, doc) => {
    if (err) {
      return res.status(500).json({ message: "Oops, something went wrong" });
    }

    if (!doc) {
      return res.status(404).json({ message: "Username not registered" });
    }

    bcrypt.compare(password, doc.password, (err, match) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Oops, something went wrong with your request" });
      }
      if (!match) {
        return res.status(403).json({ message: "Not Auth" });
      }

      let token = jwt.sign({ username }, `${process.env.TOKEN_SECRET}`, {
        expiresIn: "600s",
      });

      res.status(201).json({
        username: doc.username,
        bookmarkList: doc.bookmarkList,
        notes: doc.notes,
        token,
      });
    });
  });
  //
});

// UNIVERSAL
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = { app };
