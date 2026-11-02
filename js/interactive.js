// ===========================================================
// Gift of the Givers Foundation: Interactive elements (Part 3)
// Accordion (FAQ) and scroll-in animation.
// ===========================================================

document.addEventListener("DOMContentLoaded", function () {

  // --- Accordion: open and close one answer at a time ---
  const buttons = document.querySelectorAll(".accordion-btn");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const isOpen = button.getAttribute("aria-expanded") === "true";

      // Close every other item first
      buttons.forEach(function (other) {
        other.setAttribute("aria-expanded", "false");
        document.getElementById(other.getAttribute("aria-controls")).hidden = true;
      });

      // Open this one unless it was already open
      if (!isOpen) {
        button.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    });
  });

  // --- Scroll animation: cards fade in as they come into view ---
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(".card").forEach(function (card) {
      card.classList.add("reveal");
      observer.observe(card);
    });
  }
});