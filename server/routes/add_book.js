const express = require("express");
const router = express.Router();
const { addBookController } = require("../controllers/add_book");

const addRoute = router.post("/api/:username/bookmark", addBookController);

module.exports = addRoute;
