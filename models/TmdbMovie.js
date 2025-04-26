const mongoose = require('mongoose');

const tmdbMovieSchema = new mongoose.Schema({
  tmdbId:       { type: Number, required: true, unique: true },
  title:        { type: String, required: true },
  release_date: { type: String                },
  overview:     { type: String              },
  genre_ids:    { type: [Number], default: [] }
}, {
  collection: 'Movies'
});

module.exports = mongoose.model('TmdbMovie', tmdbMovieSchema);
