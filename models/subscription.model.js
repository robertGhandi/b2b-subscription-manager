const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
	customerName: {
		type: String,
		required: true,
	},
	email: { type: String, required: true, unique: true },
	subscriptionPlan: {
		type: String,
		required: true,
		enum: ["Monthly", "Quarterly", "Annually"],
	},
	dateOfSubscription: {
		type: Date,
		required: true,
		default: () => new Date(),
	},
	duration: { type: Number, required: true, default: 1 },
	amount: { type: Number, required: true },
	renewalDate: { type: Date, required: true },
});

const planRates = {
	Monthly: 6000,
	Quarterly: 17500,
	Annually: 70000,
};

subscriptionSchema.pre("save", function (next) {
	const subscription = this;

	// Calculate the total amount
	if (!planRates[subscription.subscriptionPlan]) {
		return next(new Error("Invalid subscription plan selected"));
	}
	subscription.amount =
		planRates[subscription.subscriptionPlan] * subscription.duration;

	// Calculate the renewal date
	const subscriptionStartDate = subscription.dateOfSubscription || new Date();
	let renewalDate = new Date(subscriptionStartDate);

	switch (subscription.subscriptionPlan) {
		case "Monthly":
			renewalDate.setMonth(
				renewalDate.getMonth() + subscription.duration
			);
			break;
		case "Quarterly":
			renewalDate.setMonth(
				renewalDate.getMonth() + 3 * subscription.duration
			);
			break;
		case "Annually":
			renewalDate.setFullYear(
				renewalDate.getFullYear() + subscription.duration
			);
			break;
		default:
			return next(new Error("Invalid subscription plan"));
	}
	subscription.renewalDate = renewalDate;

	next();
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
