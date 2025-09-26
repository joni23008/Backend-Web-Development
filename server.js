const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const cors = require("cors"); // allow React Native to connect
require("dotenv").config();

const app = express();
app.use(cors()); // allow React Native to connect

// DB connection
require("./config/db")();

// Passport config
require("./config/passport")(passport);

// Flash middleware
const flashMiddleware = require('./middlewares/flash');

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Session middleware (must come before passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_string",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    }
  })
);

app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware to attach the logged-in user to views
app.use(flashMiddleware);

// View engine setup
app.engine(
  "handlebars",
  exphbs.engine({
    extname: ".handlebars",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Routes
const mainRoutes = require("./routes/allRoutes");

app.use("/", mainRoutes);

module.exports = app;
