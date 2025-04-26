// controllers/tmdbApi.js
const axios     = require('axios');
const TmdbMovie = require('../models/TmdbMovie');

/**
 * Fetches page=1 of TMDB "popular", upserts into Mongo
 */
async function importPopular(reqOrPage, res, next) {
  // allow both (req, res, next) or (pageNumber)
  const page = typeof reqOrPage === 'number'
    ? reqOrPage
    : parseInt(reqOrPage.query.page, 10) || 1;

  try {
    const { data } = await axios.get(
      'https://api.themoviedb.org/3/movie/popular',
      {
        params: {
          api_key:  process.env.TMDB_API_KEY,
          language: 'en-US',
          page: 
        }
      }
    );

    const ops = data.results.map(m => ({
      updateOne: {
        filter: { tmdbId: m.id },
        update: {
          tmdbId:       m.id,
          title:        m.title,
          release_date: m.release_date
                             ? new Date(m.release_date)
                             : null,
          overview:     m.overview,
          genre_ids:    m.genre_ids
        },
        upsert: true
      }
    }));

    const result = await TmdbMovie.bulkWrite(ops);

    // if called as an Express handler, send JSON
    if (res && typeof res.json === 'function') {
      return res.json({
        imported: result.upsertedCount,
        updated:  result.modifiedCount
      });
    }

    // else called programmatically
    return result;
  } catch (err) {
    if (next) return next(err);
    throw err;
  }
}

/**
 * Reads back all stored movies from Mongo
 */
async function listStored(req, res, next) {
  try {
    const movies = await TmdbMovie.find()
      .sort({ release_date: -1 })
      .lean();
    return res.json(movies);
  } catch (err) {
    next(err);
  }
}

module.exports = { importPopular, listStored };
