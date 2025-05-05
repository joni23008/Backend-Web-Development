document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("movie-search");
  const suggestions = document.getElementById("search-suggestions");

  // Extract movie titles and their IDs
  const movieElements = [...document.querySelectorAll(".main-content")];
  const movieList = movieElements.map((el) => {
    const title = el.querySelector("h2 strong")?.textContent.trim();
    const id = el.id; // already like "movie-<id>"
    return { title, id };
  });

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    suggestions.innerHTML = "";

    if (!query) return;

    const matches = movieList.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );

    matches.slice(0, 10).forEach((movie) => {
      const li = document.createElement("li");
      li.textContent = movie.title;
      li.className = "suggestion-item";
      li.addEventListener("click", () => {
        const el = document.getElementById(movie.id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        input.value = "";
        suggestions.innerHTML = "";
      });
      suggestions.appendChild(li);
    });
  });
});
