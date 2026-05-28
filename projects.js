fetch("data/projects.json")
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById("projects");

    container.innerHTML = projects.map(p => `
      <div class="project-card fade-up">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <p class="project-tech">${p.tech.join(" • ")}</p>
        <a class="project-link" href="${p.link}" target="_blank">View Project</a>
      </div>
    `).join("");
  });
