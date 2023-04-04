const { findAllTypes } = require("../models/type.model.js");

const getAllTypes = async (req, res) => {
	try {
		const types = await findAllTypes();

		res.json(types);
	} catch (e) {
		console.error(e);
		res.sendStatus(500);
	}
};

module.exports = { getAllTypes };
