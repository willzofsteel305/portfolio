// Load projects from JSON and render them
fetch("projects.json")
  .then(res => res.json())
  .then(data => renderProjects(data))
  .catch(err => console.error("Error loading projects:", err));

function renderProjects(projects) {
  const container = document.getElementById("projects");
  container.innerHTML = ""; // clear loading text

  projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("project-card", "reveal");

    card.innerHTML = `
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p class="tech">${project.tech.join(" • ")}</p>
      </div>

      <div class="project-buttons">
        <a href="${project.link}" class="project-btn">Live Demo</a>
        <a href="#" class="project-btn">GitHub</a>
      </div>
    `;

    container.appendChild(card);
  });
}
