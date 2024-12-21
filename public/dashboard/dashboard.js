const navItems = document.querySelectorAll(".sidebar nav ul li");
const contentSections = document.querySelectorAll(".content-section");

// Keep track of active section
let activeSection = "Dashboard";

navItems.forEach((item) =>
	item.addEventListener("click", () => {
		// Highlight the active menu item
		navItems.forEach((nav) => nav.classList.remove("active"));
		item.classList.add("active");

		// Show the corresponding content section
		const targetSection = item.getAttribute("data-target");
		if (targetSection !== activeSection) {
			contentSections.forEach((section) => {
				section.classList.remove("active");
				if (section.getAttribute("data-section") === targetSection) {
					section.classList.add("active");
				}
			});
			activeSection = targetSection;
		}

         // Fetch and render subscriptions if the Subscription button is clicked
         if (targetSection === "Subscription") {
            fetchSubscriptions();
        }

	})
);

// Fetch and Render Subscription Table
async function fetchSubscriptions() {
	try {
		const response = await fetch("http://localhost:3000/api/v1/subscriptions");
		if (response.ok) {
			const result = await response.json();
			
            const subscriptions = result.data
            renderTable(subscriptions);
		} else {
			console.error("Failed to fetch subscriptions.");
			renderError("Unable to retrieve subscriptions at this time.");
		}
	} catch (error) {
		console.error("Error fetching subscriptions:", error);
		renderError("A network error occurred while fetching subscriptions.");
	}
}

function renderTable(data) {
	const tableBody = document.getElementById("table-body");
	tableBody.innerHTML = ""; // Clear table content

	if (!data.length) {
		tableBody.innerHTML = `<tr><td colspan="5">No subscriptions found.</td></tr>`;
		return;
	}

	data.forEach((item) => {
		const row = `
        <tr>
          <td>${item.customerName} <br> <small>${item.email}</small></td>
          <td>${item.subscriptionPlan}</td>
          <td>${item.dateOfSubscription}</td>
          <td>${item.amount}</td>
          <td>${item.renewalDate}</td>
        </tr>
      `;
		tableBody.insertAdjacentHTML("beforeend", row);
	});
}

function renderError(message) {
	const tableBody = document.getElementById("table-body");
	tableBody.innerHTML = `<tr><td colspan="5">${message}</td></tr>`;
}

// Fetch subscriptions on page load
document.addEventListener("DOMContentLoaded", () => {
	fetchSubscriptions();
    
});

function handleLogout() {
	window.location.href = "../landing-page/index.html";
}

function CreateSubscription() {
    window.location.href = "../subscription/sub.html";
}





