const express = require('express');
const router  = express.Router();


const Movie  = require('../models/Movies');

router.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

router.get('/DB', async(req,res) => {
  try {
    const movies = await Movie.find().lean();

    res.render('DBTesti', { title: 'DB Page', movies });
  } catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
