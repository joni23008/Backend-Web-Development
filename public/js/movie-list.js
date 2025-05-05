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
  if (!data || !data.data || data.data.length === 0) {
    targetElement.innerHTML = "<p>No reviews available.</p>";
    return;
  }

  const reviews = data.data;
  const listItems = reviews
    .map((item) => {
      const user = item.user?.username || "Unknown User";
      // const rating = item.rating || "No rating";
      const rating = parseInt(item.rating) || 0;
      const stars = "⭐".repeat(rating);
      const comment = item.comment || "No comment";
      const createdAt = item.createdAt || "Unknown";
      const updatedAt = item.updatedAt || "Unknown";

      return `
        <li>
          <p><strong>${user} | ${stars}</strong></p>
          <p>${comment}</p>
          <p><small>Created: ${createdAt}</small></p>
          <p><small>Updated: ${updatedAt}</small></p>
        </li>
      `;
    })
    .join("");

  targetElement.innerHTML = `<ul>${listItems}</ul>`;
}

function displayError(targetElement, error) {
  targetElement.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
}
