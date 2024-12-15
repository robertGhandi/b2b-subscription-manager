const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
	try {
		// Get auth header and check if it exists
		const authHeader =
			req.headers.Authorization || req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({
				status: "error",
				message: "No token provided 1",
			});
		}

		// Validate token and token scheme
		// Bearer {accessToken}
		const [scheme, token] = authHeader.split(" ");

		if (scheme.toLowerCase() !== "bearer" || !token) {
			return res.status(401).json({
				status: "error",
				message: "Invalid token provided 2",
			});
		}

		// decode the json web token (jwt)
		const decoded = jwt.verify(token, "1234!@#$%<{*&)");

		// use the decoded payload to find the user on the db
		const user = await User.findById(decoded.id);

		if (!user) {
			return res.status(401).json({
				status: "error",
				message: "Invalid token provided 3",
			});
		}

		// populate the req.user property of the request object
		req.user = user;

		// call next
		next();
	} catch (error) {
		console.error(error.message);

		return res.status(401).json({
			status: "error",
			message: "Invalid token provided 4",
		});
	}
};

module.exports = { auth };
