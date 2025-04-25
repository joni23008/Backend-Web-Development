// Passport.js setup
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Exports function that takes passport instance and configures it
module.exports = function(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password' });

        return done(null, user);
      } catch (err) {
        return done(err); // DB and bcrypt errors comes from here
      }
    })
  );

  // Defines that only user.id is saved in session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // When user sends request, passport adds user data to request before sending it forward
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) return done(null, false); // If user is not found, passport do not set req.user
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
};
