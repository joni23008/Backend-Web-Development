const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
require("dotenv").config();

const app = express();

// DB connection
require("./config/db")();

// Passport config
require("./config/passport")(passport);

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
  })
);

app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware to attach the logged-in user to views
app.use((req, res, next) => {
  res.locals.user = req.user || null; // Attach the logged-in user (or null if not logged in)
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error"); // for passport errors
  next();
});

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
