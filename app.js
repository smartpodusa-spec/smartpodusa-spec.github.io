function toggleMenu() {
  const el = document.getElementById("mobileNav");
  if (!el) return;
  el.classList.toggle("isOpen");
}

(function initYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

/* Formspree submit (works on contact page) */
(function initFormspree() {
  const form = document.getElementById("leadForm");
  const status = document.getElementById("formStatus");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (status) status.textContent = "Sending…";

    const endpoint = form.getAttribute("data-formspree");
    if (!endpoint) {
      if (status) status.textContent = "Form endpoint missing.";
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      });

      if (res.ok) {
        form.reset();
        if (status) status.textContent = "Sent. We’ll respond shortly.";
      } else {
        if (status) status.textContent = "Unable to send. Please try again.";
      }
    } catch {
      if (status) status.textContent = "Network error. Please try again.";
    }
  });
})();
