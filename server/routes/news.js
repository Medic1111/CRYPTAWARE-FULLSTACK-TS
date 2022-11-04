const express = require("express");
const router = express.Router();
const { newsHandler } = require("../controllers/news");

const newsRoute = router.get("/api/v1/news/crypto", newsHandler);

module.exports = newsRoute;
