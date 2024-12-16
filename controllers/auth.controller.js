const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/email.js");

const registerUser = async (req, res) => {
	try {
		const { fullName, email, password } = req.body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(409).json({
				status: "error",
				message: "user already exists",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			fullName,
			email,
			password: hashedPassword,
		});

		const token = jwt.sign({ email }, "1234!@#$%<{*&)", {
			expiresIn: "5m",
		});

		const isLocalhost = window.location.hostname === "localhost";
		const baseUrl = isLocalhost
			? "http://localhost:3000"
			: `https://${window.location.hostname}`;

		const verificationLink = `${baseUrl}/api/v1/auth/verify-email?token=${encodeURIComponent(
			token
		)}`;

		const emailTemplate = `
  <p>Hi ${fullName},</p>
  <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
  <p><a href="${verificationLink}">Verify Your Email</a></p>
  <p>This link is valid for 5 minutes.</p>
  <p>If you didn’t sign up, you can safely ignore this email.</p>
`;

		try {
			await sendEmail(email, "Verify Your Email", emailTemplate);
		} catch (emailError) {
			console.error(
				"Failed to send verification email: ",
				emailError.message
			);
			return res.status(500).json({
				status: "error",
				message: "Failed to send verification email",
			});
		}

		res.status(201).json({
			status: "success",
			message: "user created successfully",
			data: { id: newUser._id, email: newUser.email },
		});

		console.log("user created and verification email sent.");
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "An error occurred while creating user",
		});
		console.log("Error during user registration: ", error.message);
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				status: "error",
				message: "user not found",
			});
		}

		const passwordMatch = bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(400).json({
				status: "error",
				message: "Invalid email or password",
			});
		}

		// Generate jwt token
		const payload = {
			id: user._id,
			email: user.email,
		};
		const token = jwt.sign(payload, "1234!@#$%<{*&)", { expiresIn: "1h" });

		res.status(200).json({
			status: "success",
			message: "login successful",
			data: {
				token,
				user,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "unable to login ",
		});
	}
};

const verifyEmail = async (req, res) => {
	const { token } = req.query;

	if (!token) {
		return res.status(400).json({ message: "Token is required." });
	}

	try {
		const decoded = jwt.verify(token, "1234!@#$%<{*&)");

		if (!decoded.email) {
			return res.status(400).json({ message: "Invalid token payload." });
		}

		const user = await User.findOne({ email: decoded.email });

		if (!user)
			return res
				.status(400)
				.json({ message: "Invalid token or user not found." });
		if (user.verified) return res.redirect("/dashboard");

		user.verified = true;
		await user.save();

		console.log("user verified");
		res.redirect("/dashboard");
	} catch (error) {
		console.error("Verification Error: ", error);
		res.status(400).json({ message: "Invalid or expired token.", error });
	}
};

const forgotPassword = async (req, res) => {
	const { email } = req.body;

	try {
		//check if user exists
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({
				status: "error",
				message: "user not found",
			});
		}

		//Generate a reset token
		const resetToken = jwt.sign({ email }, "1234!@#$%<{*&)", {
			expiresIn: "10m",
		});

		const resetLink = `${req.protocol}://${req.get(
			"host"
		)}/reset-password?token=${resetToken}`;

		const emailTemplate = `
        <p>Hi ${user.fullName},</p>
        <p>Reset your password by clicking the link below:</p>
        <p><a href="${resetLink}">Reset Your Password</a></p>
        <p>This link is valid for 10 minutes</p>
        <p>If you didn’t request this, you can safely ignore this email.</p>
      `;

		try {
			await sendEmail(email, "Verify Your Email", emailTemplate);
		} catch (emailError) {
			console.error(
				"Failed to send reset link email: ",
				emailError.message
			);
			return res.status(500).json({
				status: "error",
				message: "Failed to send verification email",
			});
		}

		res.status(200).json({
			status: "success",
			message: "Password reset email sent",
		});
	} catch (error) {
		res.status(500).json({
			message: "Error sending email",
			error: error.message,
		});
	}
};

const resetPassword = async (req, res) => {
	const { token, newPassword } = req.body;

	try {
		const decoded = jwt.verify(token, "1234!@#$%<{*&)");

		if (!decoded.email) {
			return res.status(400).json({ message: "Invalid token payload." });
		}

		const user = await User.findOne({ email: decoded.email });

		if (!user)
			return res
				.status(400)
				.json({ message: "Invalid token or user not found." });

		//hash new password and update user
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedPassword;

		res.status(200).json({ message: "Password reset successful" });
	} catch (error) {
		console.error("Password reset Error: ", error);
		res.status(400).json({ message: "Invalid or expired token.", error });
	}
};

module.exports = {
	registerUser,
	loginUser,
	verifyEmail,
	forgotPassword,
	resetPassword,
};
