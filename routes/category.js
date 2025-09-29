const express = require('express');
const router  = express.Router();
const Movie   = require('../models/TmdbMovie');   
const Genre   = require('../models/Genre');   


router.get('/:genreName', async (req, res) => {
  try {
    const { genreName } = req.params;

    
    const genre = await Genre.findOne({ name: new RegExp(`^${genreName}$`, 'i') });
    if (!genre) {
      return res.status(404).json({ message: `Genre "${genreName}" not found` });
    }

   
    const movies = await Movie.find({ genre_ids: genre.id });

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;