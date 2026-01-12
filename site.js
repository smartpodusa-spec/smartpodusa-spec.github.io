(() => {
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("mobileNav");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  if (!toggle || !mobile) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    mobile.hidden = expanded;
  });

  // Close mobile nav after link click
  mobile.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      mobile.hidden = true;
    });
  });
})();
