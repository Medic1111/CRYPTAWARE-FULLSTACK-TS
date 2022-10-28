const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token");
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

mongoose.connect(`${process.env.DB_URI}`, (err) =>
  err ? console.log(err) : console.log("DB CONNECTED")
);

// AUTHENTICATION: Login/Register: Bcrypt and Send Token

// USER: username, password, tickerList

// FETCH API

app.get("/api/v1/:ticker", async (req, res) => {
  await axios
    .get(
      `https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${req.params.ticker}&market=USD&interval=15min&apikey=${process.env.REACT_APP_API_KEY}`
    )
    .then((serverRes) => {
      if (serverRes.data["Error Message"]) {
        return res
          .status(404)
          .json({ message: "Invalid Ticker/Ticker not found" });
      } else {
        let data = serverRes.data["Time Series Crypto (15min)"];
        let structured = [];
        Object.keys(data).forEach((key) => {
          structured.push(data[key]);
        });
        return res.status(200).json(structured);
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Alphavantage let us down" })
    );
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = { app };
