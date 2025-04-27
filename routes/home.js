const express = require("express");
const router = express.Router();
const Movie = require("../models/Movies");

router.get("/", async (req, res) => {
  // Fetch all movies
  const movies = await Movie.find().lean();
  if (req.user) {
    const user = req.user.toObject ? req.user.toObject() : req.user;
    res.render("home", { title: "Home Page", user, movies });
  } else {
    res.render("home", { title: "Home Page", movies });
  }
});

module.exports = router;
