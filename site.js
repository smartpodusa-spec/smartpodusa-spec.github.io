(() => {
  const $ = (s, el=document) => el.querySelector(s);
  const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));

  // Drawer
  const openBtn = $("#menuOpen");
  const closeBtn = $("#menuClose");
  const drawer = $("#drawer");

  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openBtn?.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);

  drawer?.addEventListener("click", (e) => {
    if (e.target === drawer) closeDrawer();
  });

  $$(".drawer__nav a").forEach(a => a.addEventListener("click", closeDrawer));

  // Active nav state (top nav + drawer + footer)
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$('a[data-nav]').forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.setAttribute("aria-current", "page");
  });

  // Footer year
  const y = $("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());
})();
