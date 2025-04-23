// imports
const mongoose = require("mongoose");

// This file defines the schema for the model using Mongoose.
// The schema specifies the structure of the documents in the collection in MongoDB.
// It includes the fields, their types, and any validation rules or default values.
// The model is then exported for use in other parts of the application.

//  Relationship Logic:
// A User can leave many reviews.
// A Movie can have many reviews.
// A User can only leave one review per Movie (unique constraint).
// Each Review belongs to exactly one user and exactly one movie.

// How References Work:
// The user and movie fields in the Review schema store the ObjectId of the respective documents.
// mongoose.Schema.Types.ObjectId is a special type in Mongoose that is used to store ObjectId values.
// You use .populate() when fetching reviews to automatically get user or movie details.
// const review = await Review.findById(someId).populate('user').populate('movie');
// This will replace the user and movie fields in the review with the actual user and movie documents.
// The compound index (user + movie) ensures that a user can't leave multiple reviews for the same movie.

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the Users collection, needs to match the model name not the raw collection name
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie", // Reference to the Movies collection, needs to match the model name not the raw collection name
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      // Validation for rating between 1 and 5, common "star" rating
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      default: "", // Optional comment field, default to empty string
    },
  },
  { timestamps: true }
);

// Ensure a user can review a movie only once, uncomment this line to enforce the constraint
// ReviewSchema.index({ user: 1, movie: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
