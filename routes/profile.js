const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const Review = require("../models/Review");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET /profile
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const user = req.user.toObject();
    delete user.password;

    if (user.role === "admin") {
      const allReviews = await Review.find().populate("user").populate("movie").lean();
      return res.render("adminProfile", {
        title: "Admin Dashboard",
        user,
        reviews: allReviews,
      });
    }

    // täs vois käyttää mun ReviewControllerin endpointtia kaikkien arvioiden hakemiseen käyttäjän mukaan
    const reviews = await Review.find({ user: user._id }).populate("movie").lean();
    console.log(reviews);
    res.render("profile", {
      title: "Your Profile",
      user,
      reviews,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong loading your profile");
    res.redirect("/");
  }
});

// POST /profile/delete
router.post("/delete", isAuthenticated, async (req, res) => {
  const { password } = req.body;

  try {
    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.flash("error", "Incorrect password");
      return res.redirect("/profile");
    }

    // täs voi mun ReviewControllerin endpointtia kaikkien käyttäjän arvioiden poistamiseen
    await Review.deleteMany({ user: req.user._id });
    await User.findByIdAndDelete(req.user._id);

    req.logout(function (err) {
      if (err) return next(err);
      req.flash("success", "Account deleted successfully");
      res.redirect("/");
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to delete account");
    res.redirect("/profile");
  }
});

// Delete review from profile page
router.post("/review/:id", isAuthenticated, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    // Check if review is found from database
    if (!review) {
      req.flash("error", "Review not found");
      return res.redirect("/profile");
    }

    const isOwner = review.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    // Check if logged user is owner of the review or admin
    if (!isOwner && !isAdmin) {
      req.flash("error", "Unauthorized to delete this review");
      return res.redirect("/profile");
    }

    await review.deleteOne();

    req.flash("success", "Review deleted successfully");
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong");
    res.redirect("/profile");
  }
});

module.exports = router;
