/* ============================================================
   IRON WILLZ — Portfolio JavaScript
   Matching script for colourful theme + updated HTML
   ============================================================ */


/* ------------------------------
   SCROLL REVEAL ANIMATION
--------------------------------*/
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger on load


/* ------------------------------
   SMOOTH SCROLL FOR NAV LINKS
--------------------------------*/
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


/* ------------------------------
   ACTIVE NAV HIGHLIGHT ON SCROLL
--------------------------------*/
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNav);


/* ------------------------------
   NEON CURSOR FOLLOW EFFECT
--------------------------------*/
const cursor = document.createElement('div');
cursor.style.position = 'fixed';
cursor.style.width = '14px';
cursor.style.height = '14px';
cursor.style.borderRadius = '50%';
cursor.style.background = 'var(--blue)';
cursor.style.pointerEvents = 'none';
cursor.style.boxShadow = '0 0 12px var(--blue), 0 0 20px var(--purple)';
cursor.style.zIndex = '9999';
cursor.style.transition = 'transform 0.08s linear';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
});


/* ------------------------------
   BUTTON CLICK RIPPLE EFFECT
--------------------------------*/
document.querySelectorAll("button, .btn, .cta-btn, .project-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");

        const rect = this.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});


/* ------------------------------
   CONTACT FORM VALIDATION
--------------------------------*/
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", e => {
        const name = form.querySelector('input[name="name"]');
        const email = form.querySelector('input[name="email"]');
        const message = form.querySelector('textarea[name="message"]');

        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            e.preventDefault();
            alert("Please fill out all fields before sending.");
        }
    });
}


/* ------------------------------
   OPTIONAL: SCROLL TO TOP BUTTON
--------------------------------*/
// Uncomment if you want a scroll‑to‑top button later
/*
const topBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        topBtn.classList.add("visible");
    } else {
        topBtn.classList.remove("visible");
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
*/
