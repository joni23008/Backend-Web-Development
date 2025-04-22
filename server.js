const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();

const app = express();

// DB connection
require('./config/db')();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const mainRoutes = require('./routes/index');
app.use('/', mainRoutes);

module.exports = app;
