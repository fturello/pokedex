const Joi = require("joi");

const passwordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

const validateUser = (user, createMode) => {
	const mode = createMode ? "required" : "optional";

	const result = Joi.object({
		email: Joi.string().email().max(254).trim().lowercase().presence(mode),
		username: Joi.string().min(3).max(20).trim().lowercase().presence(mode),
		password: Joi.string()
			.regex(passwordRegex)
			.min(8)
			.max(30)
			.trim()
			.presence(mode),
	})
		.required()
		.min(1)
		.validate(user, { abortEarly: false }).error;

	if (result) {
		const errors = result.details.map((error) => error.message);

		return { errorCount: result.details.length, errors };
	}

	return false;
};

module.exports = validateUser;
