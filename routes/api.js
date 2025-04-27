// routes/api.js
const express = require("express");
const { importPopular, listStored } = require("../controllers/tmdbApi");
const router = express.Router();
const TmdbMovie = require("../models/TmdbMovie");
const Genre = require("../models/Genre");

// GET /api/import      → trigger a manual import
router.get("/import", importPopular);

router.get("/yes", listStored);

router.get("/Movies", async (req, res) => {
  try {
    const movies = await TmdbMovie.find().lean();

    const allIds = [...new Set(movies.flatMap((m) => m.genre_ids || []))];

    const genres = await Genre.find({ id: { $in: allIds } }).lean();

    const nameById = {};
    genres.forEach((g) => {
      nameById[g.id] = g.name;
    });

    const moviesWithNames = movies.map((m) => ({
      ...m,
      genre_names: (m.genre_ids || []).map((i) => nameById[i] || "Unknown"),
    }));

    // res.render('popular', {
    //   title:  'Popular Movies',
    //   movies: moviesWithNames
    // });
    // console.log(moviesWithNames);
    res.status(200).json(moviesWithNames);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
