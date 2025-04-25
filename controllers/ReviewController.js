// const Fruit = require("../models/Fruit");
const Review = require("../models/Review");

// GET all
const readAllReviews = async (req, res) => {
  // for debugging
  console.log("Got a GET request for all reviews");
  // find all, from the database
  // no populate, just the IDs
  // const reviews = await Review.find();
  // populate user and movie fields with the actual documents, mighty be too much data
  // const reviews = await Review.find().populate("user").populate("movie");
  // populate and only get the usernmame and movie title, this exludes the rest of the data except the IDs
  // const reviews = await Review.find()
  //   .populate("user", "username")
  //   .populate("movie", "Name");
  // same thing but exclude the IDs aswell
  const reviews = await Review.find()
    .populate("user", "username -_id")
    .populate("movie", "Name -_id");
  // response
  res.status(200).json({
    success: true,
    message: "GET request completed successfully, all reviews found",
    total: reviews.length,
    data: reviews,
  });
};

// GET one by ID
const readReviewById = async (req, res) => {
  // for debugging
  console.log("Got a GET request for one review");
  console.log(req.params.id);
  // find one by ID, from the database
  const review = await Review.findById(req.params.id)
    .populate("user", "username -_id")
    .populate("movie", "Name -_id");
  if (!review) {
    return res.status(404).json({ message: "Not found" });
  }
  // response
  res.status(200).json({
    success: true,
    message: "GET request completed successfully, review found",
    data: review,
  });
};

// GET all by movie ID
const readReviewsByMovie = async (req, res) => {
  // for debugging
  console.log("Got a GET request for all reviews by movie ID");
  console.log(req.params.movieId);
  // find all by movie ID, from the database
  const reviews = await Review.find({ movie: req.params.movieId })
    .populate("user", "username -_id")
    .populate("movie", "Name -_id");
  // check if no review was found with the given ID (or it didn’t exist)
  if (!reviews) {
    return res.status(404).json({ message: "Not found" });
  }
  // response
  res.status(200).json({
    success: true,
    message: "GET request completed successfully, all reviews found",
    total: reviews.length,
    data: reviews,
  });
};

// GET all by user ID
const readReviewsByUser = async (req, res) => {
  // for debugging
  console.log("Got a GET request for all reviews by user ID");
  console.log(req.params.userId);
  // find all by user ID, from the database
  const reviews = await Review.find({ user: req.params.userId })
    .populate("user", "username -_id")
    .populate("movie", "Name -_id");
  // check if no review was found with the given ID (or it didn’t exist)
  if (!reviews) {
    return res.status(404).json({ message: "Not found" });
  }
  // response
  res.status(200).json({
    success: true,
    message: "GET request completed successfully, all reviews found",
    total: reviews.length,
    data: reviews,
  });
};

// POST add new, does not work with Postman, becuse of the session/cookie
const createReview = async (req, res) => {
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

// PATCH update by ID
const updateReviewById = async (req, res) => {
  // for debugging
  console.log("Got a PATCH request to update a review");
  console.log(req.params.id);
  console.log(req.body);
  // update one by ID, from the database
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    // new: true, // return the updated document
    // runValidators: true, // run validators on the updated document
    { new: true, runValidators: true }
  )
    .populate("user", "username -_id")
    .populate("movie", "Name -_id");
  // check if no review was found with the given ID (or it didn’t exist)
  if (!updatedReview) {
    return res.status(404).json({ message: "Not found" });
  }
  // response
  res.status(200).json({
    success: true,
    message: "PATCH request completed successfully, old review updated",
    data: updatedReview,
  });
};

// DELETE by ID
const deleteReviewById = async (req, res) => {
  // for debugging
  console.log("Got a DELETE request to remove a review");
  console.log(req.params.id);
  // delete one by ID, from the database
  const deletedReview = await Review.findByIdAndDelete(req.params.id)
    .populate("user", "username -_id")
    .populate("movie", "Name -_id");
  // check if no review was found with the given ID (or it didn’t exist)
  if (!deletedReview) {
    return res.status(404).json({ message: "Not found" });
  }
  // response
  res.status(200).json({
    success: true,
    message: "DELETE request completed successfully, review deleted",
    data: deletedReview,
  });
};

module.exports = {
  readAllReviews,
  readReviewById,
  readReviewsByMovie,
  readReviewsByUser,
  createReview,
  createReviewDummy,
  updateReviewById,
  deleteReviewById,
};

// Duplicate-ish codes:
// responses for GET, POST, PATCH, DELETE requests
// debugging console logs
// check if no review was found with the given ID (or it didn’t exist)
