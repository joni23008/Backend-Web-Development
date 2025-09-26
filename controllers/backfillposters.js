require('dotenv').config({ path: '../.env' });
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('TMDB_API_KEY:', process.env.TMDB_API_KEY);
const mongoose = require('mongoose'); // needed for disconnect
const connectDB = require('../config/db'); 
const TmdbMovie = require('../models/TmdbMovie');
const { fetchPosters } = require('./tmdbApi');

(async function main() {
  try {
    await connectDB(); // connect to MongoDB
    console.log('Starting backfill...');

    const movies = await TmdbMovie.find();
    for (const movie of movies) {
      if (movie.posters && movie.posters.length) continue; // skip if already has posters

      try {
        const posters = await fetchPosters(movie.tmdbId);
        movie.posters = posters;
        await movie.save();
        console.log(`Updated posters for ${movie.title}`);
      } catch (err) {
        console.error(`Failed for TMDB ID ${movie.tmdbId}:`, err.message);
      }
    }

    await mongoose.disconnect();
    console.log('Backfill complete');
  } catch (err) {
    console.error('Error in backfill process:', err.message);
  }
})();
