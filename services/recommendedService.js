const TmdbMovie = require("../models/TmdbMovie");
const Genre = require("../models/Genre");
const Review = require("../models/Review");

async function fetchMoviesWithGenres() {
  const movies = await TmdbMovie.find().lean();

  const allIds = [...new Set(movies.flatMap((m) => m.genre_ids || []))];
  const genres = await Genre.find({ id: { $in: allIds } }).lean();

  const nameById = {};
  genres.forEach((g) => {
    nameById[g.id] = g.name;
  });

  return movies.map((m) => ({
    ...m,
    genre_names: (m.genre_ids || []).map((i) => nameById[i] || "Unknown"),
  }));
}

async function fetchAllReviews() {
  const reviews = await Review.find().populate("user", "username -_id").populate("movie", "title -_id");
  return reviews;
}

module.exports = { fetchMoviesWithGenres, fetchAllReviews };
