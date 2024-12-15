function handleMenuClick(menu) {
	const menuItems = document.querySelectorAll(".menu-item");
	menuItems.forEach((item) => item.classList.remove("active"));

	const activeItem = Array.from(menuItems).find((item) =>
		item.textContent.toLowerCase().includes(menu)
	);
	if (activeItem) activeItem.classList.add("active");

	console.log(`${menu} clicked`);
}

function handleLogout() {
	window.location.href = "../landing-page/index.html"
}


