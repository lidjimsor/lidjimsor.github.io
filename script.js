const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const currentSection = document.querySelector("#current-section");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contact-form");

const closeMenu = () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
};

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("show");
});

overlay.addEventListener("click", closeMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const activeId = entry.target.getAttribute("id");
      currentSection.textContent = entry.target.dataset.title || "Portfolio";

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0.01,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

if (contactForm) {
  contactForm.addEventListener("submit", () => {
    const asunto = contactForm.elements.asunto.value.trim();
    const emailSubject = contactForm.querySelector("#form-email-subject");

    if (emailSubject && asunto) {
      emailSubject.value = asunto;
    }
  });
}
