import { fetchAllContent } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".projects-container");

  container.innerHTML = `<p class="loading">Loading projects...</p>`;

  try {
    const items = await fetchAllContent();

    if (!items.length) {
      container.innerHTML = `<p>No projects found.</p>`;
      return;
    }

    container.innerHTML = "";

    items.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("project-card");

      card.innerHTML = `
        <img src="${item.thumbnail || "assets/default-thumb.png"}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.description || ""}</p>
        <a href="${item.url}" target="_blank" class="btn">View</a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<p>Error loading content.</p>`;
    console.error(err);
  }
});
