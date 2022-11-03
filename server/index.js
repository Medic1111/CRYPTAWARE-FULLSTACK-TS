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
const addBookRoute = require("./routes/add_book");

// PERSONAL Middlewares
app.use("/", fetchRoute);
app.use("/", loginRoute);
app.use("/", registerRoute);
app.use("/", addBookRoute);

// DEV TESTING:

// REMOVE

// UNIVERSAL
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = { app };
