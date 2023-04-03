const Joi = require("joi");

const validateLogin = (user) => {
	const result = Joi.object({
		username: Joi.string()
			.min(3)
			.max(20)
			.trim()
			.lowercase()
			.presence("required"),
		password: Joi.string().min(8).max(30).trim().presence("required"),
	})
		.required()
		// .min(1)
		.validate(user, { abortEarly: false }).error;

	if (result) {
		const errors = result.details.map((error) => error.message);

		return { errorCount: result.details.length, errors };
	}

	return false;
};

module.exports = validateLogin;
