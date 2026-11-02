// ===========================================================
// Gift of the Givers Foundation: Shared JavaScript
// Handles the mobile navigation, active page highlight and
// form validation.
// ===========================================================

document.addEventListener("DOMContentLoaded", function () {

  // --- Mobile navigation toggle ---
  const toggleBtn = document.querySelector(".nav-toggle");
  const navList = document.querySelector("nav ul");

  if (toggleBtn && navList) {
    toggleBtn.setAttribute("aria-expanded", "false");

    toggleBtn.addEventListener("click", function () {
      const isOpen = navList.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close the menu after a link is tapped
    navList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navList.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
      });
    });

    // Close the menu with the Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        navList.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- Highlight the current page in the nav menu ---
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // --- Generic form validation (enquiry.html and contact.html) ---
  const forms = document.querySelectorAll("form[data-validate]");

  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;

      form.querySelectorAll(".error").forEach(function (el) {
        el.textContent = "";
      });

      form.querySelectorAll("[required]").forEach(function (field) {
        const errorEl = document.getElementById(field.id + "-error");
        if (!field.value.trim()) {
          isValid = false;
          if (errorEl) errorEl.textContent = "This field is required.";
        } else if (field.type === "email" && !isValidEmail(field.value)) {
          isValid = false;
          if (errorEl) errorEl.textContent = "Please enter a valid email address.";
        }
      });

      const statusEl = form.querySelector("#form-status");

      if (isValid) {
        if (statusEl) {
          statusEl.textContent = "Thank you. Your message has been received. We will be in touch soon.";
          statusEl.style.color = "#1F3864";
        }
        form.reset();
      } else {
        if (statusEl) {
          statusEl.textContent = "Please correct the highlighted fields above.";
          statusEl.style.color = "#b00020";
        }
      }
    });
  });

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
});