const express = require("express")
const router = express.Router();
const { createSubscription, getAllSubscriptions } = require("../controllers/subscription.controller")

router.post("/create", createSubscription)
router.get("/", getAllSubscriptions)

module.exports = router;