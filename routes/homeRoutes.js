const express = require("express");
const router = express.Router();
const Movie = require("../models/TmdbMovie");

router.get("/", async (req, res) => {
  // Fetch all movies
  // const movies = await Movie.find().lean();
  // const response = await fetch("/movies");
  const response = await fetch("http://localhost:5000/movies");
  const movies = await response.json();
  if (req.user) {
    const user = req.user.toObject ? req.user.toObject() : req.user;
    res.render("home", { title: "Home", user, movies });
  } else {
    res.render("home", { title: "Home", movies });
  }
});

module.exports = router;
