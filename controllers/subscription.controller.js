const Subscription = require("../models/subscription.model");

const createSubscription = async (req, res) => {
    try {
        const { customerName, email, subscriptionPlan, dateOfSubscription, amount, renewalDate } = req.body;
        const newSubscription = await Subscription.create({ customerName, email, subscriptionPlan, dateOfSubscription, amount, renewalDate })

        res.status(201).json({
            status: "success",
            message: "subscription created",
            data: newSubscription
        })
    } catch (error) {
        console.error("Error creating subscription:", error)
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        })
    }
    
}

const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find()
        res.status(200).json({
            status: "success",
            message: "subscriptions retrieved successfully",
            data: subscriptions
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching data",
            error: error.message
        })
    }
}

module.exports = { createSubscription, getAllSubscriptions };