// Toggle Review Form Visibility (left column)
function toggleReviewForm(id) {
  const form = document.getElementById(`review-form-${id}`);
  form.classList.toggle("visible");
}

// Show Reviews and Fetch If Needed (right column)
document.addEventListener("click", async (event) => {
  if (event.target.matches(".api-button")) {
    const endpoint = event.target.dataset.endpoint;
    const targetSelector = event.target.dataset.target;
    const targetElement = document.querySelector(targetSelector);

    if (!targetElement) {
      console.error(`Target element ${targetSelector} not found.`);
      return;
    }

    // Toggle visibility if already loaded
    if (targetElement.dataset.loaded === "true") {
      targetElement.classList.toggle("visible");
      return;
    }

    targetElement.classList.add("visible"); // Show while loading

    try {
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

// Render Review Items
function displayResponse(targetElement, data) {
  if (!data || !data.data || data.data.length === 0) {
    targetElement.innerHTML = "<p>No reviews available.</p>";
    return;
  }

  const reviews = data.data;
  const listItems = reviews
    .map((item) => {
      const user = item.user?.username || "Unknown User";
      const rating = item.rating || "No rating";
      const comment = item.comment || "No comment";
      const createdAt = item.createdAt || "Unknown";
      const updatedAt = item.updatedAt || "Unknown";

      return `
        <li style="margin-bottom: 1rem; border-bottom: 1px solid #ccc; padding-bottom: 0.5rem;">
          <p><strong>User:</strong> ${user}</p>
          <p><strong>Rating:</strong> ${rating}</p>
          <p><strong>Comment:</strong> ${comment}</p>
          <p><small>Created: ${createdAt}</small></p>
          <p><small>Updated: ${updatedAt}</small></p>
        </li>
      `;
    })
    .join("");

  targetElement.innerHTML = `<ul style="list-style: none; padding-left: 0;">${listItems}</ul>`;
}

// Show Error in Target Element
function displayError(targetElement, error) {
  targetElement.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
}
