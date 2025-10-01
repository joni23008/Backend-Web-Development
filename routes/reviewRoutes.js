// imports
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/ReviewController");
const { isAuthenticated } = require("../middlewares/auth");

// This file defines the routes.
// It uses Express Router to handle HTTP requests for CRUD operations.
// It imports the reviewController which contains the logic for handling these requests.

// Only logged-in users can read their own reviews, create, update, or delete. Postman does not work here.
router.get("/user/:userId", isAuthenticated, reviewController.readReviewsByUser);
router.post("/", isAuthenticated, reviewController.createReview);
router.patch("/:id", isAuthenticated, reviewController.updateReviewById);
router.delete("/:id", isAuthenticated, reviewController.deleteReviewById);

// For testing in Postman
// router.get("/user/:userId", reviewController.readReviewsByUser);
// router.patch("/:id", reviewController.updateReviewById);
// router.delete("/:id", reviewController.deleteReviewById);

// Anyone can read all reviews, by id or by movie. Postman works here.
router.get("/movie/:movieId", reviewController.readReviewsByMovie);
router.get("/:id", reviewController.readReviewById);
router.get("/", reviewController.readAllReviews);

module.exports = router;
