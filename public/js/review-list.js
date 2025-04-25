function toggleReviewForm(movieId) {
  const form = document.getElementById(`review-form-${movieId}`);
  form.classList.toggle("hidden");
}

function fetchReviews(movieId) {
  const reviewsContainer = document.getElementById(`reviews-list-${movieId}`);
  reviewsContainer.classList.toggle("hidden");

  if (!reviewsContainer.innerHTML) {
    // Fetch reviews via AJAX if not already loaded
    fetch(`/review/movie/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        const reviews = data.data;
        const reviewsHTML = generateReviewsHTML(reviews);
        reviewsContainer.innerHTML = reviewsHTML;
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }
}

function generateReviewsHTML(reviews) {
  if (reviews.length === 0) {
    return "<h3>Reviews:</h3><p>No reviews available for this movie.</p>";
  }

  const reviewsList = reviews
    .map((review) => {
      const username = review.user ? review.user.username : "Anonymous User";
      return `
        <li>
          <strong>${username}</strong>
          <p>Rating: ${review.rating}</p>
          <p>Comment: ${review.comment}</p>
          <p>Created: ${review.createdAt}</p>
        </li>
      `;
    })
    .join("");

  return `
      <h3>Reviews:</h3>
      <ul>${reviewsList}</ul>
    `;
}
