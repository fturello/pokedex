const db = require("./db.js");

const findAll = async () => {
	try {
		const [user] = await db.query("SELECT * FROM `user`");

		return user;
	} catch (e) {
		console.error(e);
	}
};

const findOne = async (id) => {
	try {
		const [user] = await db.query("SELECT * FROM `user` WHERE `id` = ?", [id]);

		return user;
	} catch (e) {
		console.error(e);
	}
};

const findByUsername = async (username) => {
	try {
		const [user] = await db.query("SELECT * FROM `user` WHERE `username` = ?", [
			username,
		]);

		return user;
	} catch (e) {
		console.error(e);
	}
};

const addOne = async (user) => {
	try {
		const { email, username, password } = user;

		const [result] = await db.query(
			"INSERT INTO `user` (`email`, `username`, `password`) VALUES (?, ?, ?)",
			[email, username, password]
		);

		return { id: result.insertId, email, username };
	} catch (e) {
		console.error(e);
	}
};

module.exports = { findAll, findOne, findByUsername, addOne };
