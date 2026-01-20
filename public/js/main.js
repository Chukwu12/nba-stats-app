menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
  overlay.classList.toggle("hidden");
});

overlay.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});


document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
    sidebar.classList.add('-translate-x-full');
  }
});


document.querySelectorAll(".sidebar-link").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("bg-blue-600", "text-white", "shadow");
  }
});
