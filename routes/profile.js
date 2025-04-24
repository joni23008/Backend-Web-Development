const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');
const Review = require('../models/Review');
const User = require('../models/User');

// GET /profile
router.get('/', isAuthenticated, async (req, res) => {
    try {
      const user = req.user.toObject();  
      const reviews = await Review.find({ user: user._id }).populate('movie');
      res.render('profile', {
        title: 'Your Profile',
        user,
        reviews
      });
    } catch (err) {
      console.error(err);
      req.flash('error', 'Something went wrong loading your profile');
      res.redirect('/');
    }
  });
  
  module.exports = router;