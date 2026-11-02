// ===========================================================
// Gift of the Givers Foundation: Form handling (Part 3)
// Validation, AJAX enquiry response and contact email.
// ===========================================================

const PHONE_PATTERN = /^(\+27|0)[0-9]{9}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_PATTERN = /^[A-Za-z\u00C0-\u024F' -]{2,60}$/;

function showError(fieldId, message) {
  const el = document.getElementById(fieldId + "-error");
  if (el) el.textContent = message;
}

function clearErrors(form) {
  form.querySelectorAll(".error").forEach(function (el) {
    el.textContent = "";
  });
}

function setStatus(form, message, isError) {
  const status = form.querySelector("#form-status");
  if (!status) return;
  status.textContent = message;
  status.style.color = isError ? "#b00020" : "#1F3864";
}

// Shared checks used by both forms. Returns true when valid.
function validateCommonFields(prefix) {
  let valid = true;
  const name = document.getElementById(prefix + "fullname").value.trim();
  const email = document.getElementById(prefix + "email").value.trim();
  const phoneEl = document.getElementById(prefix + "phone");
  const message = document.getElementById(prefix + "message").value.trim();

  if (!name) {
    showError(prefix + "fullname", "Please enter your full name.");
    valid = false;
  } else if (!NAME_PATTERN.test(name)) {
    showError(prefix + "fullname", "Use letters only, between 2 and 60 characters.");
    valid = false;
  }

  if (!email) {
    showError(prefix + "email", "Please enter your email address.");
    valid = false;
  } else if (!EMAIL_PATTERN.test(email)) {
    showError(prefix + "email", "Please enter a valid email address.");
    valid = false;
  }

  if (phoneEl && phoneEl.value.trim()) {
    const phone = phoneEl.value.replace(/\s/g, "");
    if (!PHONE_PATTERN.test(phone)) {
      showError(prefix + "phone", "Enter a South African number, e.g. 0821234567 or +27821234567.");
      valid = false;
    }
  }

  if (!message) {
    showError(prefix + "message", "Please type a message.");
    valid = false;
  } else if (message.length < 10) {
    showError(prefix + "message", "Your message must be at least 10 characters.");
    valid = false;
  } else if (message.length > 500) {
    showError(prefix + "message", "Your message must be 500 characters or less.");
    valid = false;
  }

  return valid;
}

// ---------- Enquiry form (AJAX response) ----------
function setupEnquiryForm(form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors(form);

    let valid = validateCommonFields("");
    const type = document.getElementById("enquiry-type").value;
    if (!type) {
      showError("enquiry-type", "Please choose what you are interested in.");
      valid = false;
    }

    const box = document.getElementById("enquiry-response");
    box.hidden = true;

    if (!valid) {
      setStatus(form, "Please correct the highlighted fields above.", true);
      return;
    }

    const name = document.getElementById("fullname").value.trim();
    setStatus(form, "Sending your enquiry...", false);

    // AJAX: load the response information without reloading the page
    fetch("data/enquiry-responses.json")
      .then(function (res) {
        if (!res.ok) throw new Error("Could not load response");
        return res.json();
      })
      .then(function (data) {
        showEnquiryResponse(box, data[type] || data.other, name);
        setStatus(form, "Your enquiry was submitted successfully.", false);
        form.reset();
      })
      .catch(function () {
        setStatus(form, "Something went wrong. Please try again in a moment.", true);
      });
  });
}

function showEnquiryResponse(box, info, name) {
  box.replaceChildren();

  const heading = document.createElement("h3");
  heading.textContent = info.title;

  const greeting = document.createElement("p");
  greeting.textContent = "Thank you, " + name + ". " + info.message;

  const list = document.createElement("ul");
  info.details.forEach(function (line) {
    const li = document.createElement("li");
    li.textContent = line;
    list.appendChild(li);
  });

  box.append(heading, greeting, list);
  box.hidden = false;
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ---------- Contact form (compiles an email) ----------
// Check this address on the organisation's Contact page and
// change it if it is different. Use your own address to test.
const RECIPIENT = "info@giftofthegivers.org";

function setupContactForm(form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors(form);

    let valid = validateCommonFields("c-");
    const type = document.getElementById("c-type").value;
    if (!type) {
      showError("c-type", "Please choose the type of message.");
      valid = false;
    }

    const preview = document.getElementById("contact-preview");
    preview.hidden = true;

    if (!valid) {
      setStatus(form, "Please correct the highlighted fields above.", true);
      return;
    }

    const name = document.getElementById("c-fullname").value.trim();
    const email = document.getElementById("c-email").value.trim();
    const phone = document.getElementById("c-phone").value.trim() || "Not provided";
    const message = document.getElementById("c-message").value.trim();

    // Compile the validated information into an email
    const subject = "[" + type + "] Message from " + name;
    const body =
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Phone: " + phone + "\n" +
      "Type of message: " + type + "\n\n" +
      "Message:\n" + message;

    // Show the compiled email on the page
    preview.replaceChildren();
    const heading = document.createElement("h3");
    heading.textContent = "Your email is ready to send";
    const to = document.createElement("p");
    to.textContent = "To: " + RECIPIENT + "  |  Subject: " + subject;
    const pre = document.createElement("pre");
    pre.textContent = body;
    preview.append(heading, to, pre);
    preview.hidden = false;

    setStatus(form, "Opening your email app so you can send the message...", false);

    // Open the visitor's email app with everything filled in
    window.location.href =
      "mailto:" + RECIPIENT +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const enquiryForm = document.getElementById("enquiry-form");
  if (enquiryForm) setupEnquiryForm(enquiryForm);

  const contactForm = document.getElementById("contact-form");
  if (contactForm) setupContactForm(contactForm);
});