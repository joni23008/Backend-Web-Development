const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.user) {
    const user = req.user.toObject ? req.user.toObject() : req.user;
    res.render('home', { title: 'Home Page', user });
  } else {
    res.render('home', { title: 'Home Page' });
  }
});

module.exports = router;
