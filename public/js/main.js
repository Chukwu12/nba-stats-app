const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
const menuBtn = document.getElementById("sidebar-toggle") || document.getElementById("menu-btn");
const closeBtn = document.getElementById("sidebar-close");

const openSidebar = () => {
  if (!sidebar || !overlay) return;
  sidebar.classList.remove("-translate-x-full");
  overlay.classList.remove("hidden");
};

const closeSidebar = () => {
  if (!sidebar || !overlay) return;
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
};

if (menuBtn) {
  menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    if (sidebar?.classList.contains("-translate-x-full")) {
      openSidebar();
    } else {
      closeSidebar();
    }
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", closeSidebar);
}

if (overlay) {
  overlay.addEventListener("click", closeSidebar);
}

document.addEventListener("click", (event) => {
  if (!sidebar || !menuBtn || window.innerWidth >= 768) {
    return;
  }

  if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
    closeSidebar();
  }
});
