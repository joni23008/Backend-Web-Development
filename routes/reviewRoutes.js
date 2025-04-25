// imports
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/ReviewController");
const { ensureLoggedIn } = require("../middlewares/checkAuthentication");

// This file defines the routes.
// It uses Express Router to handle HTTP requests for CRUD operations.
// It imports the reviewController which contains the logic for handling these requests.

// Only logged-in users can create, update, or delete. Postman does not work here.
router.post("/", ensureLoggedIn, reviewController.createReview);
router.patch("/:id", ensureLoggedIn, reviewController.updateReviewById);
router.delete("/:id", ensureLoggedIn, reviewController.deleteReviewById);

// Anyone can read. Postman works here.
router.get("/", reviewController.readAllReviews);
router.get("/:id", reviewController.readReviewById);

// For testing, anyone can create a dummy review. Postman works here.
router.post("/dummy", reviewController.createReviewDummy);

module.exports = router;
