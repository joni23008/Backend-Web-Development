function toggleReviewForm(id) {
  const form = document.getElementById(`review-form-${id}`);
  if (form.classList.contains("visible")) {
    form.classList.remove("visible");
  } else {
    form.classList.add("visible");
  }
}

document.addEventListener("click", async (event) => {
  if (event.target.matches(".api-button")) {
    const endpoint = event.target.dataset.endpoint;
    const targetSelector = event.target.dataset.target;
    const targetElement = document.querySelector(targetSelector);

    if (!targetElement) {
      console.error(`Target element ${targetSelector} not found.`);
      return;
    }

    if (targetElement.dataset.loaded === "true") {
      targetElement.classList.toggle("visible");
      return;
    }

    targetElement.classList.remove("visible");

    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      displayResponse(targetElement, data);
      targetElement.dataset.loaded = "true";
      targetElement.classList.add("visible");
    } catch (error) {
      console.error("Fetch error:", error);
      displayError(targetElement, error);
    }
  }
});

function displayResponse(targetElement, data) {
  const announcement = document.getElementById("review-announcement");

  if (!data || !data.data || data.data.length === 0) {
    targetElement.innerHTML = "<p>No reviews available.</p>";
    announcement.textContent = "No reviews found for this movie.";
    return;
  }

  const reviews = data.data;
  const listItemsHtml = reviews
    .map((item) => {
      const user = item.user?.username || "Unknown User";
      const rating = parseInt(item.rating) || 0;
      const stars = "⭐".repeat(rating);
      const comment = item.comment || "No comment";

      return `
        <li>
          <p><strong>${user} | ${stars}</strong></p>
          <p>${comment}</p>
        </li>
      `;
    })
    .join("");

  // Render HTML visually
  targetElement.innerHTML = `<ul>${listItemsHtml}</ul>`;

  // Create accessible plain text version for screen reader announcement
  const reviewText = reviews
    .map((item) => {
      const user = item.user?.username || "Unknown User";
      const rating = parseInt(item.rating) || 0;
      const stars = rating
        ? `${rating} star${rating === 1 ? "" : "s"}`
        : "No rating";
      const comment = item.comment || "No comment";
      return `${user}, ${stars}: ${comment}`;
    })
    .join(". ");

  announcement.textContent = `${reviews.length} review${
    reviews.length === 1 ? "" : "s"
  }: ${reviewText}.`;
}

function displayError(targetElement, error) {
  targetElement.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
}
