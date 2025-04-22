// Login, register, logout routes
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Render Register Page
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle Register Logic
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    req.flash('error', 'Username already exists.');
    return res.redirect('/auth/register');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  // Log user in automatically after registration
  req.logIn(newUser, (err) => {
    if (err) {
      return res.redirect('/auth/register');
    }
    res.redirect('/');
  });
});

// Render Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle Login Logic (using Passport)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true,
}));

// Handle Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;

