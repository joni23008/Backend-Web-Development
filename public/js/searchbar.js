document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("movie-search");
  const suggestions = document.getElementById("search-suggestions");
  let currentFocusIndex = -1; // Track which suggestion is highlighted

  // Extract movie titles and their IDs
  const movieElements = [...document.querySelectorAll(".main-content")];
  const movieList = movieElements.map((el) => {
    const title = el.querySelector("h2 strong")?.textContent.trim();
    const id = el.id;
    return { title, id };
  });

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    suggestions.innerHTML = "";
    currentFocusIndex = -1;

    if (!query) return;

    const matches = movieList.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );

    matches.slice(0, 10).forEach((movie, index) => {
      const li = document.createElement("li");
      li.textContent = movie.title;
      li.className = "suggestion-item";
      li.id = `suggestion-${index}`;
      li.setAttribute("tabindex", "-1");
      li.dataset.index = index;

      li.addEventListener("click", () => {
        scrollToMovie(movie.id);
        clearSuggestions();
      });

      suggestions.appendChild(li);
    });
    const status = document.getElementById("search-status");
    if (matches.length > 0) {
      const titles = matches.map((m) => m.title).join(", ");
      status.textContent = `${matches.length} movie${
        matches.length === 1 ? "" : "s"
      } found: ${titles}.`;
    } else {
      status.textContent = "No movies found.";
    }
  });

  input.addEventListener("keydown", (e) => {
    const items = suggestions.querySelectorAll(".suggestion-item");
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      currentFocusIndex = (currentFocusIndex + 1) % items.length;
      setActive(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      currentFocusIndex = (currentFocusIndex - 1 + items.length) % items.length;
      setActive(items);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (currentFocusIndex > -1) {
        items[currentFocusIndex].click();
      }
    } else if (e.key === "Escape") {
      clearSuggestions();
    }
  });

  function setActive(items) {
    const status = document.getElementById("search-status");

    items.forEach((item, idx) => {
      if (idx === currentFocusIndex) {
        item.classList.add("active");
        input.setAttribute("aria-activedescendant", item.id); // For screen readers
        item.scrollIntoView({ block: "nearest" });

        // 🔊 Update live region to announce the active suggestion
        status.textContent = `Suggestion ${idx + 1} of ${items.length}: ${
          item.textContent
        }`;
      } else {
        item.classList.remove("active");
      }
    });
  }

  function scrollToMovie(id) {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -55;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      // Ensure the movie element is focusable
      el.setAttribute("tabindex", "0");
      // Focus on the movie element after scrolling
      el.focus();
    }
  }

  function clearSuggestions() {
    suggestions.innerHTML = "";
    input.value = "";
    currentFocusIndex = -1;
  }
});
