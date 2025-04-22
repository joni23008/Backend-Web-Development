const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');

router.use('/auth', authRoutes);

router.get('/', (req, res) => {
  if(req.user){ // If user is logged in, send user info to homepage
    const user = req.user.toObject();
    console.log(user); // REMOVE THIS
    res.render('home', { title: 'Home Page', user });
  }else{
    res.render('home', { title: 'Home Page' });
  }
});



module.exports = router;
