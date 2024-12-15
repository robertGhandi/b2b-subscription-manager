const navItems = document.querySelectorAll(".sidebar nav ul li");
const contentSections = document.querySelectorAll(".content-section");

navItems.forEach((item) =>
  item.addEventListener("click", () => {
    // Highlight the active menu item
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");

    // Show the corresponding content section
    const targetSection = item.textContent.trim();
    contentSections.forEach((section) => {
      if (section.getAttribute("data-section") === targetSection) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });
  })
);

function handleLogout() {
	window.location.href = "../landing-page/index.html"
}


