(function () {
  // -----------------------------
  // Mobile drawer open/close
  // -----------------------------
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
    drawer.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeDrawer);
    });
  }

  // -----------------------------
  // Remove current page link from nav + drawer
  // -----------------------------
  function normalizePath(p) {
    try {
      return (p || "").split("?")[0].split("#")[0].toLowerCase();
    } catch {
      return "";
    }
  }

  const currentPath = normalizePath(window.location.pathname);
  const currentFile = currentPath.endsWith("/")
    ? "index.html"
    : (currentPath.split("/").pop() || "index.html");

  // Maps page -> href to remove
  const removeHrefByPage = {
    "how-it-works.html": "how-it-works.html",
    "faq.html": "faq.html",
    "contact.html": "#contact", // if you use a separate contact page, change to "contact.html"
  };

  // If you have a dedicated contact page (contact.html), uncomment this and remove the "#contact" above:
  // removeHrefByPage["contact.html"] = "contact.html";

  const hrefToRemove = removeHrefByPage[currentFile];

  if (hrefToRemove) {
    const targets = document.querySelectorAll('.nav a, .drawer__nav a, .footerLinks a');
    targets.forEach((a) => {
      const href = (a.getAttribute("href") || "").trim();
      // Remove exact match OR match by filename (handles relative paths)
      const hrefNorm = normalizePath(href);
      const hrefFile = hrefNorm.endsWith("/") ? "index.html" : hrefNorm.split("/").pop();

      const removeExact = href === hrefToRemove;
      const removeByFile = hrefToRemove.endsWith(".html") && hrefFile === hrefToRemove;

      if (removeExact || removeByFile) {
        a.remove();
      }
    });
  }

  // -----------------------------
  // Footer year
  // -----------------------------
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());
})();
