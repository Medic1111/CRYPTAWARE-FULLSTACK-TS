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
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
// AUTHENTICATION: Login/Register: Bcrypt and Send Token

// PERSONAL Middlewares
app.use("/", fetchRoute);
app.use("/", loginRoute);
app.use("/", registerRoute);

// DEV TESTING:

// UNIVERSAL
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = { app };
