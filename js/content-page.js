const API_BASE = "https://YOUR-BACKEND.onrender.com/api";

async function loadContent(type) {
  const container = document.querySelector(".content-container");
  container.innerHTML = `<p class="loading">Loading ${type}...</p>`;

  try {
    const res = await fetch(`${API_BASE}/content/${type}`);
    const items = await res.json();

    if (!items.length) {
      container.innerHTML = `<p>No ${type} available yet.</p>`;
      return;
    }

    container.innerHTML = "";

    items.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("content-card");

      card.innerHTML = `
        <img src="${item.thumbnail || "assets/default-thumb.png"}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.description || ""}</p>
        <a href="${item.url}" target="_blank" class="btn">Open</a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<p>Error loading content.</p>`;
    console.error(err);
  }
}

// Expose globally
window.loadContent = loadContent;
