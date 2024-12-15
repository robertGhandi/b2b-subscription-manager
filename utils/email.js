require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, html) => {
	try {
		if (!process.env.USER || !process.env.PASS || !process.env.SERVICE) {
			throw new Error(
				"Missing required environment variables for email configuration."
            
            );
			
		}

		const transporter = nodemailer.createTransport({
			service: process.env.SERVICE,
			port: 465,
			secure: true,
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
			tls: {
				servername: "smtp.gmail.com",
				rejectUnauthorized: false,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			html: html,
		});

		console.log("email sent successfully", email);
	} catch (error) {
		console.error("Failed to send email: ", error.message);
		throw error;
	}
};

module.exports = sendEmail;
