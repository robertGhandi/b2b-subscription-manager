const {
	registerUser,
	loginUser,
	verifyEmail,
    forgotPassword,
    resetPassword
} = require("../controllers/auth.controller");

const { validateUser } = require("../validators/signup.validator");
const { validateLoginUser } = require("../validators/login.validator");
const express = require("express");
const router = express.Router();

router.post("/register", validateUser, registerUser);
router.post("/login", validateLoginUser, loginUser);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
