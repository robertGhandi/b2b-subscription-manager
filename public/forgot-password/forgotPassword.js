// handle login-form submission
const resetPasswordForm = document.getElementById("reset-form");
const resetBtn = document.getElementById("reset-btn");
const loadingSpinner = document.getElementById("loading-spinner");

resetPasswordForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const email = document.getElementById("email").value.trim();

	showLoading(true);

	try {
		const response = await fetch(
			`${window.location.origin}/api/v1/auth/forgot-password`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			}
		);

		const result = await response.json();
		const responseMessage = document.getElementById("responseMessage");

		if (response.ok) {
			responseMessage.textContent = "Password reset link sent successful!, check your email.";
			responseMessage.style.color = "green";

		} else {
			responseMessage.textContent = result.message || "An error occured";
            setTimeout(() => {
                responseMessage.textContent = ""
            }, 4000)
			
		}
	} catch (error) {
		console.error("Error:", error);
        responseMessage.textContent = "Something went wrong. Please try again."

        setTimeout(() => {
            responseMessage.textContent = ""
        }, 4000)

	} finally {
		showLoading(false);
	}
});

function closeBtn() {
	window.location.href = "../auth-page/login.html";
}

function showLoading(isLoading) {
	if (loadingSpinner) {
		loadingSpinner.style.display = isLoading ? "block" : "none";
	} else {
		console.warn("Loading spinner element not found.");
	}
}
