// const Fruit = require("../models/Fruit");
const Review = require("../models/Review");

// GET all
const readAllReviews = async (req, res) => {
  // for debugging
  console.log("Got a GET request for all reviews");
  // response
  res.status(200).json({
    message: "Success",
  });
  //   try {
  //     const fruits = await Fruit.find();
  //     res.status(200).json({
  //       message: "Success",
  //       results: fruits.length,
  //       data: fruits,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
};

// GET one by ID
const readReviewById = async (req, res) => {
  // for debugging
  console.log("Got a GET request for one review");
  console.log(req.params.id);
  // response
  res.status(200).json({
    message: "Success",
  });
  //   try {
  //     const fruit = await Fruit.findById(req.params.id);
  //     if (!fruit) {
  //       return res.status(404).json({ message: "Fruit not found" });
  //     }
  //     res.status(200).json({
  //       message: "Success, fruit found",
  //       data: fruit,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
};

// POST add new
const createReview = async (req, res) => {
  // Theory of how to create a review:
  // 1. User logs in → You store session/cookie.
  // 2. User clicks “Write Review” on a movie →
  // The movie's ID is part of the button/link/form as it is part of the movie object rendered to frontend.
  // 3. Form submits → Sends rating + comment + movie ID to backend.

  // for debugging
  console.log("Got a POST request to add a review");
  console.log(req.body);

  const { movie, rating, comment } = req.body;
  // 4. Backend reads user ID from session/cookie.
  // You can access it via req.user._id if you use a session middleware like express-session or passport.js.
  const user = req.user._id;
  // for debugging
  console.log(user);

  // 5. Backend creates review which looks something like this:
  const newReview = new Review({
    user, // expects a valid user ID as a string
    movie, // expects a valid movie ID as a string
    rating, // expects a number (1-5)
    comment, // optional, can be string
  });

  // for debugging
  console.log(newReview);

  await newReview.save();

  // respond with a redirect to the home page
  res.redirect("/");
  // respond with JSON (for debugging)
  // res.status(200).json({
  //   message: "Success",
  //   review: newReview,
  // });
};

// POST add new dummy
const createReviewDummy = async (req, res) => {
  console.log("Got a POST request to add a dummy review");
  console.log(req.body);

  const { user, movie, rating, comment } = req.body;

  const newReview = new Review({
    user, // expects a valid user ID as a string
    movie, // expects a valid movie ID as a string
    rating, // expects a number (1-5)
    comment, // optional, can be string
  });
  // for debugging
  console.log(newReview);

  await newReview.save();

  res.status(200).json({
    message: "Success",
    review: newReview,
  });
};

// PATCH update by ID
const updateReviewById = async (req, res) => {
  // for debugging
  console.log("Got a PATCH request to update a review");
  console.log(req.params.id);
  console.log(req.body);
  // response
  res.status(200).json({
    message: "Success",
  });
  //   try {
  //     const updatedFruit = await Fruit.findByIdAndUpdate(
  //       req.params.id,
  //       req.body,
  //       { new: true, runValidators: true }
  //     );

  //     if (!updatedFruit) {
  //       return res.status(404).json({ message: "Fruit not found" });
  //     }

  //     res.status(200).json({
  //       message: "Success, fruit updated",
  //       data: updatedFruit,
  //     });
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
};

// DELETE by ID
const deleteReviewById = async (req, res) => {
  // for debugging
  console.log("Got a DELETE request to remove a review");
  console.log(req.params.id);
  // response
  res.status(200).json({
    message: "Success",
  });
  //   try {
  //     const deletedFruit = await Fruit.findByIdAndDelete(req.params.id);
  //     if (!deletedFruit) {
  //       return res.status(404).json({ message: "Fruit not found" });
  //     }
  //     res.status(200).json({
  //       message: "Success, fruit deleted",
  //       id: deletedFruit._id,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
};

module.exports = {
  readAllReviews,
  readReviewById,
  createReview,
  createReviewDummy,
  updateReviewById,
  deleteReviewById,
};
