const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const path = require("path");
const reviewRoutes = require("./routes/reviewRoutes");
require("dotenv").config();

const app = express();

// DB connection
require("./config/db")();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.engine(
  "handlebars",
  exphbs.engine({
    extname: ".handlebars",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Routes
// reviews routes
app.use("/api/review", reviewRoutes);
// root route
app.get("/", (req, res) => {
  res.status(200).send("Let's start to review some movies!");
});

module.exports = app;
