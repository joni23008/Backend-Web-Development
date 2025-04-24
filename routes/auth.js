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

//Change password
router.post('/change-password', async (req,res) => {
  const {currentPassword, newPassword, confirmPassword} = req.body;

  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  };

  if (newPassword !== confirmPassword) {
    req.flash('error', 'Passwords are not matching');
    return res.redirect('/')
  };

  const user = await User.findById(req.user._id);

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    req.flash('error', 'Wrong password')
    return res.redirect('/')
  };

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  
  req.flash('success', 'Password has been changed')
  res.redirect('/')
});

module.exports = router;

