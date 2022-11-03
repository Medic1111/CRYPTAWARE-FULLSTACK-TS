const express = require("express");
const router = express.Router();
const { remBookController } = require("../controllers/rem_book");

const remBookRoute = router.patch("/api/:username/bookmark", remBookController);

module.exports = remBookRoute;
