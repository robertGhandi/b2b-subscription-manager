document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("subscriptionForm");
	const subscriptionPlan = document.getElementById("subscriptionPlan");
	const duration = document.getElementById("duration");
	const amount = document.getElementById("amount");
	const dateOfSubscription = document.getElementById("dateOfSubscription");
	const renewalDate = document.getElementById("renewalDate");
	const responseMessage = document.getElementById("responseMessage");

	const planRates = {
		Monthly: 6000,
		Quarterly: 17500,
		Annually: 70000,
	};

	// Set the default date for subscription
	const today = new Date();
	dateOfSubscription.value = today.toISOString().split("T")[0];

	// Event listener to calculate the amount and renewal date dynamically
	subscriptionPlan.addEventListener("change", updateAmountAndRenewalDate);
	duration.addEventListener("input", updateAmountAndRenewalDate);

	function updateAmountAndRenewalDate() {
		const plan = subscriptionPlan.value;
		const durationValue = parseInt(duration.value, 10);

		if (!plan || isNaN(durationValue) || durationValue <= 0) {
			amount.value = "";
			renewalDate.value = "";
			return;
		}

		// Calculate the amount
		amount.value = planRates[plan] * durationValue;

		// Calculate the renewal date
		const renewal = new Date(today);
		switch (plan) {
			case "Monthly":
				renewal.setMonth(renewal.getMonth() + durationValue);
				break;
			case "Quarterly":
				renewal.setMonth(renewal.getMonth() + 3 * durationValue);
				break;
			case "Annually":
				renewal.setFullYear(renewal.getFullYear() + durationValue);
				break;
		}
		renewalDate.value = renewal.toISOString().split("T")[0];
	}

	
	// Form submission handler
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const data = {
			customerName: document.getElementById("customerName").value,
			email: document.getElementById("email").value,
			subscriptionPlan: subscriptionPlan.value,
			duration: parseInt(duration.value, 10),
			amount: parseFloat(amount.value),
			dateOfSubscription: dateOfSubscription.value,
			renewalDate: renewalDate.value,
		};

		try {
			const response = await fetch(
				"https://b2b-subscription-manager.vercel.app/api/v1/subscriptions/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (response.ok) {
				const result = await response.json();
				responseMessage.textContent =
					"Subscription successfully added!";
				responseMessage.style.color = "green";
				console.log("Response Data:", result);
			} else {
				const error = await response.json();
				responseMessage.textContent = `Error: ${
					error.message || "Failed to add subscription"
				}`;
				responseMessage.style.color = "red";
				console.error("Error Response:", error);
			}
		} catch (err) {
			responseMessage.textContent =
				"Network error. Please try again later.";
			responseMessage.style.color = "red";
            
			console.error("Network Error:", err);
		}

		// Reset form
		form.reset();
		dateOfSubscription.value = today.toISOString().split("T")[0];
		amount.value = "";
		renewalDate.value = "";
	});
});
