const express = require('express');
const router  = express.Router();
const Genre   = require('../models/Genre');

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.json(genres);
});

module.exports = router;