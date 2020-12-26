const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const asyncHandler = require("express-async-handler");
const router = express.Router();

router.get("/test", async (req, res) => {
  res.json({ msg: "Hello User Routes" });
});

module.exports = router;
