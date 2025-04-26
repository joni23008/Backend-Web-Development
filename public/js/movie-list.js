// for revealing the review form on the movie
function toggleReviewForm(movieId) {
  const form = document.getElementById(`review-form-${movieId}`);
  form.classList.toggle("hidden");
}

// for adding a event listener for clicking (button), takes the response from the server and sends it to the corresponding function
document.addEventListener("click", async (event) => {
  if (event.target.matches(".api-button")) {
    const endpoint = event.target.dataset.endpoint;
    const targetSelector = event.target.dataset.target;
    const targetElement = document.querySelector(targetSelector);

    if (!targetElement) {
      console.error(`Target element ${targetSelector} not found.`);
      return;
    }

    // If the content is already loaded, just toggle visibility
    if (targetElement.dataset.loaded === "true") {
      targetElement.classList.toggle("hidden");
      return;
    }

    targetElement.classList.toggle("hidden");

    try {
      // using the Fetch API to make a request to the server
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      displayResponse(targetElement, data);
      targetElement.dataset.loaded = "true"; // Mark as loaded
    } catch (error) {
      console.error("Fetch error:", error);
      displayError(targetElement, error);
    }
  }
});

// for displaying the reviews in HTML format, takes desired parts from the response
function displayResponse(targetElement, data) {
  if (!data || !data.data) {
    targetElement.innerHTML = "<p>No reviews available.</p>";
    return;
  }

  const reviews = data.data;
  const listItems = reviews
    .map((item) => {
      const user = item.user ? item.user.username : "Unknown User";
      const rating = item.rating || "No rating provided";
      const comment = item.comment || "No comment provided";
      const createdAt = item.createdAt || "Unknown date on creation";
      const updatedAt = item.updatedAt || "Unknown date on update";

      return `
        <li>
          <p>User: ${user}</p>
          <p>Rating: ${rating}</p>
          <p>Comment: ${comment}</p>
          <p>Created At: ${createdAt}</p>
          <p>Updated At: ${updatedAt}</p>
        </li>
      `;
    })
    .join("");

  targetElement.innerHTML = `<ul>${listItems}</ul>`;
}

// for displaying the error message in HTML format, takes the error message from the response
function displayError(targetElement, error) {
  targetElement.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
}
