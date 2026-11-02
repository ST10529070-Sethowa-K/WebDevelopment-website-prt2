// ===========================================================
// Gift of the Givers Foundation: Services page (Part 3)
// Loads services from JSON, then searches, filters and sorts.
// ===========================================================

document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("services-grid");
  if (!grid) return;

  const searchBox = document.getElementById("service-search");
  const categoryBox = document.getElementById("service-category");
  const sortBox = document.getElementById("service-sort");
  const countEl = document.getElementById("services-count");
  let services = [];

  fetch("data/services.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Could not load services");
      return res.json();
    })
    .then(function (data) {
      services = data;
      fillCategories();
      render();
    })
    .catch(function () {
      countEl.textContent = "Sorry, the services could not be loaded right now.";
    });

  function fillCategories() {
    const categories = Array.from(new Set(services.map(function (s) { return s.category; }))).sort();
    categories.forEach(function (c) {
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c;
      categoryBox.appendChild(option);
    });
  }

  function render() {
    const term = searchBox.value.trim().toLowerCase();
    const category = categoryBox.value;

    const results = services.filter(function (s) {
      const matchesText = (s.name + " " + s.description + " " + s.category).toLowerCase().includes(term);
      const matchesCategory = category === "all" || s.category === category;
      return matchesText && matchesCategory;
    });

    results.sort(function (a, b) {
      return sortBox.value === "za" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
    });

    grid.replaceChildren();
    results.forEach(function (s) {
      const card = document.createElement("div");
      card.className = "card";

      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = s.category;

      const title = document.createElement("h3");
      title.textContent = s.name;

      const text = document.createElement("p");
      text.textContent = s.description;

      card.append(tag, title, text);
      grid.appendChild(card);
    });

    countEl.textContent = results.length === 0
      ? "No services match your search. Try a different word."
      : "Showing " + results.length + " of " + services.length + " services";
  }

  searchBox.addEventListener("input", render);
  categoryBox.addEventListener("change", render);
  sortBox.addEventListener("change", render);
});