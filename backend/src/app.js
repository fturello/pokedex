require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const router = require("./routers");

const path = require("path");

const fs = require("node:fs");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
		optionsSuccessStatus: 200,
	})
);

app.use("/api", router);

const reactIndexFile = path.join(
	__dirname,
	"..",
	"..",
	"frontend",
	"dist",
	"index.html"
);

if (fs.existsSync(reactIndexFile)) {
	app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

	app.get("*", (req, res) => {
		res.sendFile(reactIndexFile);
	});
}

app.get("*", (req, res) => {
	res.status(404).json({ message: "Not found !" });
});

module.exports = app;
