const express = require("express");
const router = express.Router();
const { registerHandler } = require("../controllers/register");

const registerRoute = router.post("/api/v1/register", registerHandler);

module.exports = registerRoute;
