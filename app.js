function toggleMenu() {
  document.getElementById("mobileNav").classList.toggle("open");
}

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("leadForm");
const statusEl = document.getElementById("formStatus");

// IMPORTANT: set this to YOUR email for the fallback mailto (works immediately)
const FALLBACK_EMAIL = "placements@smartpodusa.com";

function buildMailto(formData) {
  const subject = encodeURIComponent("SmartPod placement request");
  const lines = [];
  for (const [k, v] of formData.entries()) {
    lines.push(`${k}: ${String(v).trim()}`);
  }
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formspree = form.getAttribute("data-formspree")?.trim();
  const data = new FormData(form);

  // If Formspree endpoint is configured, submit via fetch (no page reload)
  if (formspree) {
    try {
      statusEl.textContent = "Sending…";
      const res = await fetch(formspree, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        form.reset();
        statusEl.textContent = "Sent. Thank you—we’ll contact you within 1–2 business days.";
        return;
      }

      // If Formspree fails, fall back to mailto
      statusEl.textContent = "Form service not available. Opening email fallback…";
      window.location.href = buildMailto(data);
    } catch {
      statusEl.textContent = "Network issue. Opening email fallback…";
      window.location.href = buildMailto(data);
    }
    return;
  }

  // No Formspree set: mailto fallback (works immediately)
  window.location.href = buildMailto(data);
});
