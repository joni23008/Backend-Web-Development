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
  // for debugging
  console.log("Got a POST request to add a review");
  console.log(req.body);

  // Theory of how to create a review:
  // 1. User logs in → You store session/cookie.
  // 2. User clicks “Write Review” on a movie → The movie's ID is part of the button/link/form as it is part of the movie object rendered to frontend.
  // 3. Form submits → Sends rating + comment + movie ID to backend.
  // 4. Backend reads user ID from session/cookie. You can access it via req.user._id if you use a session middleware like express-session or passport.js.
  // 5. Backend creates review which looks something like this:
  // const newReview = new Review({
  //   user: req.user._id, // from session/cookie
  //   movie: req.body.movie, // from form submission
  //   rating: req.body.rating, // from form submission
  //   comment: req.body.comment, // from form submission
  // });

  // Hardcoded test values:
  const dummyUserId = new mongoose.Types.ObjectId("68077a175ecd59fe75d919f0"); // replace with a real user ID from your DB
  const dummyMovieId = new mongoose.Types.ObjectId("68077b255ecd59fe75d919f2"); // replace with a real movie ID

  const newReview = new Review({
    user: dummyUserId,
    movie: dummyMovieId,
    rating: 3,
    comment: "This is a hardcoded review for testing.",
  });

  await newReview.save();

  // response
  res.status(200).json({
    message: "Success",
    review: newReview,
  });

  //   try {
  //     const { name, price, inStock, harvestDate, nutrition } = req.body;

  //     const newFruit = new Fruit({
  //       name,
  //       price,
  //       inStock: inStock === "true",
  //       harvestDate: new Date(harvestDate),
  //       nutrition,
  //     });

  //     await newFruit.save();
  //     res.redirect("/fruits");
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
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
  updateReviewById,
  deleteReviewById,
};
