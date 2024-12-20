const togglePasswordBtn = document.getElementById("toggle-password");
const passwordIcon = document.getElementById("password-icon");
const resetPasswordForm = document.getElementById("reset-form");
const loadingSpinner = document.getElementById("loading-spinner");
const feedback = document.getElementById("password-feedback");

const url = new URL(window.location.href);
const token = url.searchParams.get("token");

resetPasswordForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const newPassword = document.getElementById("password").value.trim();

	if (!isValidPassword(newPassword)) {
		feedback.textContent =
			"Password must be at least 8 characters long and include letters, numbers and speacial characters.";
		feedback.style.color = "red";

		setTimeout(() => {
			feedback.textContent = "";
		}, 4000);
		return;
	}

	showLoading(true);

	try {
		const response = await fetch(
			"https://b2b-subscription-manager.vercel.app/api/v1/auth/reset-password",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ token, newPassword }),
			}
		);

		const result = await response.json();
		const responseMessage = document.getElementById("responseMessage");

		if (response.ok) {
			responseMessage.textContent = "Password updated successfully!";
			responseMessage.style.color = "green";
		} else {
			responseMessage.textContent = result.message || "An error occured";
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

function showLoading(isLoading) {
	if (loadingSpinner) {
		loadingSpinner.style.display = isLoading ? "block" : "none";
	} else {
		console.warn("Loading spinner element not found.");
	}
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
