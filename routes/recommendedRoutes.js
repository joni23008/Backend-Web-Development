// 28 - Action
// 12 - Adventure
// 16 - Animation
// 35 - Comedy
// 80 - Crime
// 99 - Documentary
// 18 - Drama
// 10751 - Family
// 14 - Fantasy
// 36 - History
// 27 - Horror
// 10402 - Music
// 9648 - Mystery
// 10749 - Romance
// 878 - Science Fiction
// 10770 - TV Movie
// 53 - Thriller
// 10752 - War
// 37 - Western

// const express = require("express");
// const router = express.Router();
// const { isAuthenticated } = require("../middlewares/auth");
// const { fetchMoviesWithGenres, fetchAllReviews } = require("../services/recommendedService");

// // GET - 10 random movie recommendations, for everyone
// // testing: http://localhost:5000/recommended/
// router.get("/", async (req, res) => {
//   try {
//     console.log("[recommendedRandom] 🔧 Fetching...");

//     // Fetch all movies
//     // const moviesRes = await fetch(`${req.protocol}://${req.get("host")}/movies`);
//     // const moviesRes = await fetch("/movies");
//     const movies = await moviesRes.json(); // adjust if API returns {data: []}

//     // Shuffle movies and pick 10 random movies
//     const shuffled = [...movies].sort(() => 0.5 - Math.random());
//     const random10 = shuffled.slice(0, 10);

//     console.log("[recommendedRandom] ✅ Fetched:", random10.length);

//     res.status(200).json({
//       success: true,
//       message: "GET request completed successfully, random movies found",
//       total: random10.length,
//       data: random10,
//     });
//   } catch (err) {
//     console.error("[recommendedRandom] ❌ Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "GET request failed",
//       error: err.message,
//     });
//   }
// });

// // GET - recommendations by movie genres and average ratings, only for logged-in users
// // testing: http://localhost:5000/recommended/user/?genreIds=27
// // testing: http://localhost:5000/recommended/user/?genreIds=28&genreIds=12
// // testing: http://localhost:5000/recommended/user/
// router.get("/user/", isAuthenticated, async (req, res) => {
//   try {
//     console.log("[recommendedUser] 🔧 Fetching...");

//     // 1. Read genres from query
//     let { genreIds } = req.query;
//     if (genreIds) {
//       if (!Array.isArray(genreIds)) genreIds = [genreIds];
//       genreIds = genreIds.map((id) => parseInt(id, 10));
//     }

//     // 2. Fetch all movies
//     // const moviesRes = await fetch("http://localhost:5000/movies");
//     // const moviesRes = await fetch(`${req.protocol}://${req.get("host")}/movies`);
//     const movies = await moviesRes.json(); // adjust if API returns {data: []}

//     // 3. Filter movies by genreIds if provided
//     let filteredMovies = movies;
//     if (genreIds && genreIds.length > 0) {
//       filteredMovies = movies.filter((m) => m.genre_ids.some((gid) => genreIds.includes(gid)));
//     }

//     // map for quick lookup later
//     const movieMap = new Map(filteredMovies.map((m) => [m._id, m]));

//     // 4. Fetch all reviews
//     // const reviewsRes = await fetch("http://localhost:5000/review");
//     const reviewsRes = await fetch(`${req.protocol}://${req.get("host")}/review`);
//     const reviewsJson = await reviewsRes.json();
//     const reviews = reviewsJson.data || [];

//     // 5. Collect ratings for movies that passed genre filter
//     const ratings = {}; // { movieId: [ratings] }
//     reviews.forEach((r) => {
//       const movieTitle = r.movie?.title;
//       const matchedMovie = filteredMovies.find((m) => m.title === movieTitle);
//       if (matchedMovie) {
//         if (!ratings[matchedMovie._id]) ratings[matchedMovie._id] = [];
//         ratings[matchedMovie._id].push(r.rating);
//       }
//     });

//     // 6. Calculate averages
//     const averages = Object.entries(ratings).map(([movieId, arr]) => {
//       const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
//       return { movieId, avg, count: arr.length };
//     });

//     // 7. Sort by highest average rating
//     averages.sort((a, b) => b.avg - a.avg);

//     let top10;

//     if (averages.length === 0) {
//       // Fallback: no reviews for these genres/movies → return random 10
//       console.log("[recommendedUser] ⚠️ No reviews found, returning random movies");
//       const shuffled = [...filteredMovies].sort(() => 0.5 - Math.random());
//       top10 = shuffled.slice(0, 10).map((movie) => ({
//         ...movie,
//         average_rating: null,
//         review_count: 0,
//       }));
//     } else {
//       // 8. Pick top 10 and merge average rating into movie object
//       top10 = averages.slice(0, 10).map(({ movieId, avg, count }) => {
//         const movie = movieMap.get(movieId);
//         return {
//           ...movie,
//           average_rating: avg,
//           review_count: count,
//         };
//       });
//     }

//     console.log("[recommendedUser] ✅ Fetched:", top10.length);

//     // 9. Response
//     res.status(200).json({
//       success: true,
//       message: "GET request completed successfully, recommendations found",
//       received_genres: genreIds || "all",
//       total: top10.length,
//       data: top10,
//     });
//   } catch (err) {
//     console.error("[recommendedUser] ❌ Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "GET request failed",
//       error: err.message,
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { fetchMoviesWithGenres, fetchAllReviews } = require("../services/recommendedService");

// GET - 10 random movie recommendations, for everyone
router.get("/", async (req, res) => {
  try {
    console.log("[recommendedRandom] 🔧 Fetching...");

    // Fetch all movies directly from service
    const movies = await fetchMoviesWithGenres();

    // Shuffle and pick 10 random movies
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    const random10 = shuffled.slice(0, 10);

    console.log("[recommendedRandom] ✅ Fetched:", random10.length);

    res.status(200).json({
      success: true,
      message: "GET request completed successfully, random movies found",
      total: random10.length,
      data: random10,
    });
  } catch (err) {
    console.error("[recommendedRandom] ❌ Error:", err);
    res.status(500).json({
      success: false,
      message: "GET request failed",
      error: err.message,
    });
  }
});

// GET - recommendations by genres and ratings for logged-in users
router.get("/user/", isAuthenticated, async (req, res) => {
  try {
    console.log("[recommendedUser] 🔧 Fetching...");

    // 1. Read genres from query
    let { genreIds } = req.query;
    if (genreIds) {
      if (!Array.isArray(genreIds)) genreIds = [genreIds];
      genreIds = genreIds.map((id) => parseInt(id, 10));
    }

    // 2. Fetch all movies from service
    const movies = await fetchMoviesWithGenres();

    // 3. Filter movies by genreIds if provided
    let filteredMovies = movies;
    if (genreIds && genreIds.length > 0) {
      filteredMovies = movies.filter((m) => m.genre_ids.some((gid) => genreIds.includes(gid)));
    }

    // Map for quick lookup later
    const movieMap = new Map(filteredMovies.map((m) => [m._id, m]));

    // 4. Fetch all reviews from service
    const reviews = await fetchAllReviews();

    // 5. Collect ratings for filtered movies
    const ratings = {}; // { movieId: [ratings] }
    reviews.forEach((r) => {
      const movieTitle = r.movie?.title;
      const matchedMovie = filteredMovies.find((m) => m.title === movieTitle);
      if (matchedMovie) {
        if (!ratings[matchedMovie._id]) ratings[matchedMovie._id] = [];
        ratings[matchedMovie._id].push(r.rating);
      }
    });

    // 6. Calculate averages
    const averages = Object.entries(ratings).map(([movieId, arr]) => {
      const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
      return { movieId, avg, count: arr.length };
    });

    // 7. Sort by highest average rating
    averages.sort((a, b) => b.avg - a.avg);

    let top10;

    if (averages.length === 0) {
      // Fallback: no reviews → return random 10
      console.log("[recommendedUser] ⚠️ No reviews found, returning random movies");
      const shuffled = [...filteredMovies].sort(() => 0.5 - Math.random());
      top10 = shuffled.slice(0, 10).map((movie) => ({
        ...movie,
        average_rating: null,
        review_count: 0,
      }));
    } else {
      // Pick top 10 and merge average rating into movie object
      top10 = averages.slice(0, 10).map(({ movieId, avg, count }) => {
        const movie = movieMap.get(movieId);
        return {
          ...movie,
          average_rating: avg,
          review_count: count,
        };
      });
    }

    console.log("[recommendedUser] ✅ Fetched:", top10.length);

    // 9. Response
    res.status(200).json({
      success: true,
      message: "GET request completed successfully, recommendations found",
      received_genres: genreIds || "all",
      total: top10.length,
      data: top10,
    });
  } catch (err) {
    console.error("[recommendedUser] ❌ Error:", err);
    res.status(500).json({
      success: false,
      message: "GET request failed",
      error: err.message,
    });
  }
});

module.exports = router;
