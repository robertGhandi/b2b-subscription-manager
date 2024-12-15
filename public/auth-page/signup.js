// handle signup-form submission
const form = document.getElementById("signup-form");
const signupBtn = document.getElementById("signup-btn");
const loadingSpinner = document.getElementById("loading-spinner");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const fullName = document.getElementById("full-name").value.trim();
	const email = document.getElementById("email").value.trim();
	const password = document.getElementById("password").value.trim();
	const feedback = document.getElementById("password-feedback");

	if (!isValidPassword(password)) {
		feedback.textContent =
			"Password must be at least 8 characters long and include letters, numbers and speacial characters.";
		feedback.style.color = "red";

		setTimeout(() => {
			feedback.textContent = "";
		}, 4000);
		return;
	}

	showLoading(true);

	// Send data to backend
	try {
		const response = await fetch(
			`${window.location.origin}/api/v1/auth/register`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, email, password }),
			}
		);

		console.log("Response:", response);

		const result = await response.json();
		const responseMessage = document.getElementById("responseMessage");

		console.log(result);

		if (response.ok) {
			responseMessage.textContent =
				"Signup successful! Check your email for verification.";
			responseMessage.style.color = "green";
			form.reset();
		} else {
			responseMessage.textContent = result.error || "Signup failed";
			setTimeout(() => {
				responseMessage.textContent = "";
			}, 4000);
		}
	} catch (error) {
		console.error("Error:", error);
		responseMessage.textContent = "Something went wrong. Please try again";
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

function isValidPassword(password) {
	const minLength = 8;
	const hasLetter = /[a-zA-Z]/.test(password);
	const hasNumber = /\d/.test(password);
	const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

	return (
		password.length >= minLength && hasLetter && hasNumber && hasSpecialChar
	);
}

function showLoading(isLoading) {
	if (loadingSpinner) {
		loadingSpinner.style.display = isLoading ? "block" : "none";
	} else {
		console.warn("Loading spinner element not found.");
	}
}
