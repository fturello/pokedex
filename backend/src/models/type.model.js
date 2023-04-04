const db = require("./db.js");

const findAllTypes = async () => {
	try {
		const [types] = await db.query("SELECT * FROM `type`");

		return types;
	} catch (e) {
		console.error(e);
	}
};

module.exports = {
	findAllTypes,
};
