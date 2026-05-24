document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".search-form");
  const searchInput = document.getElementById("site-search");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();

      if (query.length > 0) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      }
    });
  }
});
