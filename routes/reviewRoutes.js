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
router.post("/user/", isAuthenticated, reviewController.createReview);
router.patch("/user/:id", isAuthenticated, reviewController.updateReviewById);
router.delete("/user/:id", isAuthenticated, reviewController.deleteReviewById);
router.delete("/user/all/:userId", isAuthenticated, reviewController.deleteReviewsByUser);

// For testing in Postman
// router.get("/user/:userId", reviewController.readReviewsByUser);
// router.patch("/user/:id", reviewController.updateReviewById);
// router.delete("/user/:id", reviewController.deleteReviewById);
// router.delete("/user/all/:userId", reviewController.deleteReviewsByUser);

// Anyone can read all reviews, by id or by movie. Postman works here.
router.get("/movie/:movieId", reviewController.readReviewsByMovie);
router.get("/:id", reviewController.readReviewById);
router.get("/", reviewController.readAllReviews);

module.exports = router;
