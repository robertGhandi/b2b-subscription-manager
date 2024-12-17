// handle login-form submission
const loginForm = document.getElementById("login-form");
const loadingSpinner = document.getElementById("loading-spinner");

loginForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const email = document.getElementById("email").value.trim();
	const password = document.getElementById("password").value.trim();

	showLoading(true);

	try {
		const response = await fetch(
			"https://b2b-subscription-manager.vercel.app/api/v1/auth/login",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			}
		);

		const result = await response.json();
		const responseMessage = document.getElementById("responseMessage");

		if (response.ok) {
			responseMessage.textContent = "Login successful!";
			responseMessage.style.color = "green";

			setTimeout(() => {
				window.location.href = "../dashboard/dashboard.html";
			}, 2000);
		} else {
			responseMessage.textContent = result.message || "Login failed";
			setTimeout(() => {
				responseMessage.textContent = "";
			}, 4000);
		}
	} catch (error) {
		console.error("Error:", error);
		responseMessage.textContent = "Something went wrong. Please try again.";

		setTimeout(() => {
			responseMessage.textContent = "";
		}, 4000);
	} finally {
		showLoading(false);
	}
});

function closeBtn() {
	window.location.href = "../landing-page/index.html";
}

function showLoading(isLoading) {
	if (loadingSpinner) {
		loadingSpinner.style.display = isLoading ? "block" : "none";
	} else {
		console.warn("Loading spinner element not found.");
	}
}
