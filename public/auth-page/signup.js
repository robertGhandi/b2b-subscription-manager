const togglePasswordBtn = document.getElementById("toggle-password");
const form = document.getElementById("signup-form");
const loadingSpinner = document.getElementById("loading-spinner");
const passwordIcon = document.getElementById("password-icon");

// handle signup-form submission
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
			"https://b2b-subscription-manager.vercel.app/api/v1/auth/register",
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

togglePasswordBtn.addEventListener("click", () => {
	const passwordInput = document.getElementById("password");
	const isPasswordVisible = passwordInput.type === "text";

	passwordInput.type = isPasswordVisible ? "password" : "text";

	passwordIcon.classList.toggle("fa-eye");
	passwordIcon.classList.toggle("fa-eye-slash");

	togglePasswordBtn.setAttribute(
		"aria-label",
		isPasswordVisible ? "Show password" : "Hide password"
	);
});
