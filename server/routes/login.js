const express = require("express");
const router = express.Router();
const { loginHandler } = require("../controllers/login");

const loginRoute = router.post("/api/v1/login", loginHandler);

module.exports = loginRoute;
