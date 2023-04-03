const { findByUsername } = require("../models/user.model.js");

const { verifyPassword } = require("../helpers/argon.helper.js");
const { encodeJWT } = require("../helpers/jwt.helper.js");

const validateLogin = require("../validators/login.validator.js");

const login = async (req, res) => {
	try {
		const errors = validateLogin(req.body);

		if (errors) return res.status(400).json(errors);

		const [user] = await findByUsername(req.body.username);

		if (!user) return res.status(400).json({ message: "Invalid username" });

		const isPasswordValid = await verifyPassword(
			user.password,
			req.body.password
		);

		if (!isPasswordValid)
			return res.status(400).json({ message: "Invalid password" });

		delete user.password;

		const token = encodeJWT(user);

		res.status(200).json({ token });
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
};

const logout = async (req, res) => {};

module.exports = { login, logout };
