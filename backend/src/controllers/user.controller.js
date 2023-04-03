const { findAll, findOne, addOne } = require("../models/user.model.js");

const validateUser = require("../validators/user.validator.js");

const { hashPassword } = require("../helpers/argon.helper.js");

const getAll = async (req, res) => {
	try {
		const users = await findAll();

		res.json(users);
	} catch (e) {
		res.sendStatus(500);
	}
};

const getOne = async (req, res) => {
	try {
		const userId = parseInt(req.params.id, 10);

		if (isNaN(userId)) throw new Error("Invalid ID");

		const [user] = await findOne(userId);

		res.json(user);
	} catch (e) {
		res.sendStatus(500);
	}
};

const createOne = async (req, res) => {
	try {
		const errors = validateUser(req.body);

		if (errors) return res.status(400).json(errors);

		const hashedPassword = await hashPassword(req.body.password);

		const result = await addOne({ ...req.body, password: hashedPassword });

		res.status(201).json(result);
	} catch (e) {
		res.sendStatus(500);
	}
};

module.exports = { getAll, getOne, createOne };
