const express = require("express");
const router = express.Router();
const { fetchHandler } = require("../controllers/fetch");

const fetchRoute = router.get("/api/v1/:ticker", fetchHandler);

module.exports = fetchRoute;
