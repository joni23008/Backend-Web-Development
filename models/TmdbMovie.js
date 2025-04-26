// models/TmdbMovie.js
const mongoose = require('mongoose');

const tmdbMovieSchema = new mongoose.Schema({
  tmdbId:       { type: Number, required: true, unique: true },
  title:        { type: String, required: true },
  release_date: { type: Date                },
  overview:     { type: String              },
  genre_ids:    { type: [Number], default: [] }
}, {
  collection: 'Moviesv2'
});

module.exports = mongoose.model('TmdbMovie', tmdbMovieSchema);
