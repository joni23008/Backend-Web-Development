
const express  = require('express');
const router   = express.Router();
const dbRouter = require('./DB');


router.use('/DB', dbRouter);


router.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

module.exports = router;
