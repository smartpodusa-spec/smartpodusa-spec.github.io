(function initSuggestFormAndQR(){
  // QR
  const qrEl = document.getElementById("qrCode");
  const qrLink = document.getElementById("qrLink");
  if (qrEl && typeof QRCode !== "undefined") {
    const url = window.location.href;
    if (qrLink) qrLink.textContent = url;
    qrEl.innerHTML = "";
    new QRCode(qrEl, { text: url, width: 180, height: 180 });
  }

  // Suggestion form (products.html)
  const form = document.getElementById("suggestForm");
  const status = document.getElementById("suggestStatus");
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
        if (status) status.textContent = "Sent. Thank you.";
      } else {
        if (status) status.textContent = "Unable to send. Please try again.";
      }
    } catch {
      if (status) status.textContent = "Network error. Please try again.";
    }
  });
})();
window.addEventListener("DOMContentLoaded", () => {
  (function initSuggestFormAndQR(){
    const qrEl = document.getElementById("qrCode");
    const qrLink = document.getElementById("qrLink");
    if (qrEl && typeof QRCode !== "undefined") {
      const url = window.location.href;
      if (qrLink) qrLink.textContent = url;
      qrEl.innerHTML = "";
      new QRCode(qrEl, { text: url, width: 180, height: 180 });
    }

    const form = document.getElementById("suggestForm");
    const status = document.getElementById("suggestStatus");
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
          if (status) status.textContent = "Sent. Thank you.";
        } else {
          if (status) status.textContent = "Unable to send. Please try again.";
        }
      } catch {
        if (status) status.textContent = "Network error. Please try again.";
      }
    });
  })();
});
