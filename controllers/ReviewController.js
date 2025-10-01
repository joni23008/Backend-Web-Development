const Review = require("../models/Review");

// GET - all reviews
const readAllReviews = async (req, res) => {
  try {
    console.log("[readAllReviews] 🔧 Fetching...");
    // fetch all reviews from database, and populate username and movie title (no IDs)
    const reviews = await Review.find().populate("user", "username -_id").populate("movie", "title -_id");
    // for if you need movie id or user id
    // const reviews = await Review.find().populate("user").populate("movie");
    console.log("[readAllReviews] ✅ Fetched:", reviews.length);
    // response
    res.status(200).json({
      success: true,
      message: "GET request completed successfully, all reviews found",
      total: reviews.length,
      data: reviews,
    });
  } catch (err) {
    console.error("[readAllReviews] ❌ Error:", err);
    res.status(500).json({
      success: false,
      message: "GET request failed",
      error: err.message,
    });
  }
};

// GET - (1)one review by ID
const readReviewById = async (req, res) => {
  try {
    console.log("[readReviewById] 🔧 Fetching...");
    // fetch (1)one from database by id, and populate username and movie title (no IDs)
    const review = await Review.findById(req.params.id)
      .populate("user", "username -_id")
      .populate("movie", "title -_id");
    if (!review) {
      console.log("[readReviewById] ⚠️ Review not found");
      return res.status(404).json({ message: "Not found" });
    }
    console.log("[readReviewById] ✅ Fetched:", req.params.id);
    // response
    res.status(200).json({
      success: true,
      message: "GET request completed successfully, review found",
      data: review,
    });
  } catch (err) {
    console.error("[readReviewById] ❌ Error:", err);
    res.status(500).json({
      success: false,
      message: "GET request failed",
      error: err.message,
    });
  }
};

// GET - all reviews by movie ID
const readReviewsByMovie = async (req, res) => {
  try {
    console.log("[readReviewsByMovie] 🔧 Fetching...");
    // fetch all from database by movie id, and populate username and movie title (no IDs)
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate("user", "username -_id")
      .populate("movie", "title -_id");
    // check if no review was found with the given ID (or it didn’t exist)
    if (!reviews || reviews.length === 0) {
      console.log("[readReviewsByMovie] ⚠️ No reviews found for this movie");
      return res.status(404).json({ message: "Not found" });
    }
    console.log("[readReviewsByMovie] ✅ Fetched:", reviews.length);
    // response
    res.status(200).json({
      success: true,
      message: "GET request completed successfully, all reviews found",
      total: reviews.length,
      data: reviews,
    });
  } catch (err) {
    console.error("[readReviewsByMovie] ❌ Error:", err);
    res.status(500).json({
      success: false,
      message: "GET request failed",
      error: err.message,
    });
  }
};

// GET - all reviews by user ID
const readReviewsByUser = async (req, res) => {
  try {
    console.log("[readReviewsByUser] 🔧 Fetching...");
    // fetch all from database by user id, and populate username and movie title (no IDs)
    const reviews = await Review.find({ user: req.params.userId })
      .populate("user", "username -_id")
      .populate("movie", "title -_id");
    // check if no review was found with the given ID (or it didn’t exist)
    if (!reviews || reviews.length === 0) {
      console.log("[readReviewsByUser] ⚠️ No reviews found for this user");
      return res.status(404).json({ message: "Not found" });
    }
    console.log("[readReviewsByUser] ✅ Fetched:", reviews.length);
    // response
    res.status(200).json({
      success: true,
      message: "GET request completed successfully, all reviews found",
      total: reviews.length,
      data: reviews,
    });
  } catch (err) {
    console.error("[readReviewsByUser] ❌ Error:", err);
    res.status(500).json({
      success: false,
      message: "GET request failed",
      error: err.message,
    });
  }
};

// POST - create a new review
const createReview = async (req, res) => {
  try {
    console.log("[createReview] 🔧 Creating...");
    // extract review data from the form/request, attach user(auth/passport), create Review-object, and save to DB
    const { movie, rating, comment } = req.body;
    const user = req.user._id;
    const newReview = new Review({
      user, // expects a valid user ID as a string
      movie, // expects a valid movie ID as a string
      rating, // expects a number (1-5)
      comment, // optional, can be string
    });
    await newReview.save();
    console.log("[createReview] ✅ Created:", newReview);
    // response, in json if X-Requested-From is equal to mobile
    if (req.get("X-Requested-From") === "mobile") {
      return res.status(200).json({
        success: true,
        message: "POST request completed successfully, one review created",
        data: newReview,
      });
    }
    // response, in html
    return res.redirect("/");
  } catch (err) {
    console.error("[createReview] ❌ Error:", err);
    if (req.get("X-Requested-From") === "mobile") {
      return res.status(500).json({
        success: false,
        message: "POST request failed",
        error: err.message,
      });
    }
  }
};

// PATCH - update a review by ID
const updateReviewById = async (req, res) => {
  try {
    console.log("[updateReviewById] 🔧 Updating...");
    // update review by ID with validation and return updated document with username and movie title (no IDs)
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      // new: true, // return the updated document
      // runValidators: true, // run validators on the updated document
      { new: true, runValidators: true }
    )
      .populate("user", "username -_id")
      .populate("movie", "title -_id");
    // check if no review was found with the given ID (or it didn’t exist)
    if (!updatedReview) {
      console.log("[updateReviewById] ⚠️ Review not found");
      return res.status(404).json({ message: "Not found" });
    }
    console.log("[updateReviewById] ✅ Updated:", updatedReview._id);
    // response
    res.status(200).json({
      success: true,
      message: "PATCH request completed successfully, old review updated",
      data: updatedReview,
    });
  } catch (err) {
    console.error("[updateReviewById] ❌ Error:", err);
    res.status(500).json({
      success: false,
      message: "PATCH request failed",
      error: err.message,
    });
  }
};

// DELETE - remove a review by ID
const deleteReviewById = async (req, res) => {
  try {
    console.log("[deleteReviewById] 🔧 Deleting...");
    // delete a review by ID from the database and return it populated with username and movie title (no IDs)
    const deletedReview = await Review.findByIdAndDelete(req.params.id)
      .populate("user", "username -_id")
      .populate("movie", "title -_id");
    // check if no review was found with the given ID (or it didn’t exist)
    if (!deletedReview) {
      console.log("[deleteReviewById] ⚠️ Review not found");
      return res.status(404).json({ message: "Not found" });
    }
    console.log("[deleteReviewById] ✅ Deleted:", deletedReview._id);
    // response
    res.status(200).json({
      success: true,
      message: "DELETE request completed successfully, review deleted",
      data: deletedReview,
    });
  } catch (err) {
    console.error("[deleteReviewById] ❌ Error:", err);
    res.status(500).json({
      success: false,
      message: "DELETE request failed",
      error: err.message,
    });
  }
};

// DELETE - remove all reviews by a user
const deleteReviewsByUser = async (req, res) => {
  try {
    console.log("[deleteReviewsByUser] 🔧 Deleting...");

    // find all reviews by user
    const userReviews = await Review.find({ user: req.params.userId });
    // check if no reviews were found
    if (!userReviews || userReviews.length === 0) {
      console.log("[deleteReviewsByUser] ⚠️ No reviews found for this user");
      return res.status(404).json({ message: "Not found" });
    }

    // delete all reviews for that user
    await Review.deleteMany({ user: req.params.userId });

    console.log("[deleteReviewsByUser] ✅ Deleted:", req.params.userId);

    // response
    res.status(200).json({
      success: true,
      message: `DELETE request completed successfully, ${userReviews.length} review(s) deleted for this user`,
      data: userReviews, // returning the deleted reviews populated
    });
  } catch (err) {
    console.error("[deleteReviewsByUser] ❌ Error:", err);
    res.status(500).json({
      success: false,
      message: "DELETE request failed",
      error: err.message,
    });
  }
};

// ====================================================================================================
// POST add new, does not work with Postman, becuse of the session/cookie
const createReviewOld = async (req, res) => {
  // for debugging
  console.log("Got a POST request to add a review");
  console.log(req.body);
  // Theory of how to create a review:
  // 1. User logs in → You store session/cookie.
  // 2. User clicks “Write Review” on a movie →
  // The movie's ID is part of the button/link/form as it is part of the movie object rendered to frontend.
  // 3. Form submits → Sends rating + comment + movie ID to backend.
  const { movie, rating, comment } = req.body;
  // 4. Backend reads user ID from session/cookie.
  // You can access it via req.user._id if you use a session middleware like express-session or passport.js.
  const user = req.user._id;
  // for debugging
  console.log(user);
  // 5. Backend creates a newReview object
  const newReview = new Review({
    user, // expects a valid user ID as a string
    movie, // expects a valid movie ID as a string
    rating, // expects a number (1-5)
    comment, // optional, can be string
  });
  // for debugging
  console.log(newReview);
  // save to the database
  await newReview.save();
  // respond with a redirect to the home page
  res.redirect("/");
  // respond with JSON (for debugging)
  // res.status(200).json({
  //   success: true,
  //   message: "POST request completed successfully, new review created",
  //   data: newReview,
  // });
};

// POST add new dummy
const createReviewDummy = async (req, res) => {
  // for debugging
  console.log("Got a POST request to add a dummy review");
  console.log(req.body);
  // retrieve the user ID among others from the request body
  const { user, movie, rating, comment } = req.body;
  // create a new review object
  const newReview = new Review({
    user, // expects a valid user ID as a string
    movie, // expects a valid movie ID as a string
    rating, // expects a number (1-5)
    comment, // optional, can be string
  });
  // for debugging
  console.log(newReview);
  // save to the database
  await newReview.save();
  // response
  res.status(200).json({
    success: true,
    message: "POST request completed successfully, new review created",
    data: newReview,
  });
};
// ====================================================================================================

module.exports = {
  readAllReviews,
  readReviewById,
  readReviewsByMovie,
  readReviewsByUser,
  createReview,
  updateReviewById,
  deleteReviewById,
  deleteReviewsByUser,
};
