const nav = document.querySelector(".main-nav");
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll("[data-nav]");
const currentPath = window.location.pathname.split("/").pop() || "index.html";
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
  });
}

navLinks.forEach((link) => {
  const linkPath = link.getAttribute("href");
  if (linkPath === currentPath) {
    link.classList.add("is-active");
  }

  link.addEventListener("click", () => {
    if (nav && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
    }
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});

const revealTargets = document.querySelectorAll(".section, .product-card, .contact-card, .contact-form");
revealTargets.forEach((el) => el.setAttribute("data-reveal", ""));

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealTargets.forEach((el) => observer.observe(el));

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-slider-dots span");

if (heroSlides.length > 1) {
  let activeIndex = 0;
  setInterval(() => {
    heroSlides[activeIndex].classList.remove("is-active");
    if (heroDots[activeIndex]) {
      heroDots[activeIndex].classList.remove("is-active");
    }

    activeIndex = (activeIndex + 1) % heroSlides.length;
    heroSlides[activeIndex].classList.add("is-active");
    if (heroDots[activeIndex]) {
      heroDots[activeIndex].classList.add("is-active");
    }
  }, 2800);
}

if (!document.querySelector(".mobile-call-fab")) {
  const callFab = document.createElement("a");
  callFab.className = "mobile-call-fab";
  callFab.href = "tel:+919833935161";
  callFab.textContent = "Call to Order";
  callFab.setAttribute("aria-label", "Call Walnut Shell to order");
  document.body.appendChild(callFab);
}
