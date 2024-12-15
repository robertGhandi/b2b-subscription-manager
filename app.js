const authRoutes = require("./routes/auth.routes");
const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const path = require("path");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/auth", authRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "landing-page", "index.html"));
});

app.get("/dashboard", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "dashboard", "dashboard.html"));
});

app.get("/reset-password", (req, res) => {
	res.sendFile(
		path.join(__dirname, "public", "resetPassword", "resetPassword.html")
    );
});

const startServer = async () => {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/b2b-app");
		console.log("Connected to database");
		app.listen(PORT, () => {
			console.log(`server running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Error during startup: ", error);
        process.exit(1);
	}
};
startServer();
