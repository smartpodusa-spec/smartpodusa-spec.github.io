(function () {
  // Mobile drawer open/close
  const drawer = document.querySelector("[data-drawer]");
  const openBtn = document.querySelector("[data-menu-open]");
  const closeBtn = document.querySelector("[data-menu-close]");

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (openBtn) openBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

  if (drawer) {
    drawer.addEventListener("click", (e) => {
      if (e.target === drawer) closeDrawer();
    });
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeDrawer));
  }

  // Remove current page link from nav + drawer + footer links
  function normalize(p) {
    return (p || "").split("?")[0].split("#")[0].toLowerCase();
  }

  const path = normalize(window.location.pathname);
  const file = path.endsWith("/") ? "index.html" : (path.split("/").pop() || "index.html");

  // Remove link that points to the current file
  const links = document.querySelectorAll(".nav a, .drawer__nav a, .footerLinks a");
  links.forEach((a) => {
    const href = (a.getAttribute("href") || "").trim();
    const hrefNorm = normalize(href);
    const hrefFile = hrefNorm.endsWith("/") ? "index.html" : hrefNorm.split("/").pop();

    if (hrefFile === file) a.remove();
  });

  // Footer year
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());
})();
