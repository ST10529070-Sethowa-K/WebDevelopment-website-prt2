document.addEventListener("DOMContentLoaded", function () {
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  if (items.length === 0) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.hidden = true;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Photo viewer");

  const img = document.createElement("img");
  img.className = "lightbox-img";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "lightbox-close";
  closeBtn.setAttribute("aria-label", "Close photo");
  closeBtn.textContent = "×";

  const prevBtn = document.createElement("button");
  prevBtn.type = "button";
  prevBtn.className = "lightbox-prev";
  prevBtn.setAttribute("aria-label", "Previous photo");
  prevBtn.textContent = "‹";

  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.className = "lightbox-next";
  nextBtn.setAttribute("aria-label", "Next photo");
  nextBtn.textContent = "›";

  overlay.append(img, closeBtn, prevBtn, nextBtn);
  document.body.appendChild(overlay);

  let current = 0;
  let lastFocused = null;

  function show(index) {
    current = (index + items.length) % items.length;
    img.src = items[current].dataset.large;
    img.alt = items[current].dataset.alt;
  }

  function open(index) {
    lastFocused = document.activeElement;
    show(index);
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  items.forEach(function (item, i) {
    item.addEventListener("click", function () { open(i); });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function () { show(current - 1); });
  nextBtn.addEventListener("click", function () { show(current + 1); });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", function (e) {
    if (overlay.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
});