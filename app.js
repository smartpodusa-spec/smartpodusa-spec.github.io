function toggleMenu(){
  const nav = document.getElementById("mobileNav");
  if (nav) nav.classList.toggle("isOpen");
}

window.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});
