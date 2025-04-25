const express = require("express");
const router = express.Router();
const Movie = require("../models/Movies");
const Review = require("../models/Review");

router.get("/", async (req, res) => {
  const movies = await Movie.find().lean();
  const reviews = await Review.find().lean().populate("user").populate("movie");
  if (req.user) {
    const user = req.user.toObject ? req.user.toObject() : req.user;
    res.render("home", { title: "Home Page", user, movies, reviews });
  } else {
    res.render("home", { title: "Home Page", movies, reviews });
  }
});

module.exports = router;
