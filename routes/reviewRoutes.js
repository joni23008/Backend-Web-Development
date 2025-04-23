// imports
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/ReviewController");

// This file defines the routes.
// It uses Express Router to handle HTTP requests for CRUD operations.
// It imports the reviewController which contains the logic for handling these requests.

router.get("/", reviewController.readAllReviews);
router.get("/:id", reviewController.readReviewById);
router.post("/", reviewController.createReview);
router.patch("/:id", reviewController.updateReviewById);
router.delete("/:id", reviewController.deleteReviewById);

module.exports = router;
