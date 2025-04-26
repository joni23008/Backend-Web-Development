// routes/api.js
const express      = require('express');
const { importPopular, listStored } = require('../controllers/tmdbApi');
const router       = express.Router();
const TmdbMovie  = require('../models/TmdbMovie');

// GET /api/import      → trigger a manual import
router.get('/import', importPopular);

// GET /api/movies      → list all saved movies
router.get('/yes',  listStored);

// routes/tmdb.js
router.get('/Movies', async (req, res) => {
    const movies = await TmdbMovie.find().lean();
    res.render('popular', { title: 'Popular Movies', movies });
  });
  
module.exports = router;
