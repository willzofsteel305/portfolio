// Smooth scroll for buttons + nav links
document.querySelectorAll("[data-scroll], .nav-link").forEach(el => {
  el.addEventListener("click", e => {
    const target = el.getAttribute("data-scroll") || el.getAttribute("href");
    if (target.startsWith("#")) {
      e.preventDefault();
      document.querySelector(target).scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 200;
    const height = sec.offsetHeight;

    if (top >= offset && top < offset + height) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
