const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Movie = require("../models/Movie");

const asyncHandler = require("express-async-handler");
const router = express.Router();

router.get("/test", async (req, res) => {
  res.json({ msg: "Hello Movie Routes" });
});
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

module.exports = router;
