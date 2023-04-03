const jwt = require("jsonwebtoken");

const encodeJWT = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
};

const decodeJWT = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { encodeJWT, decodeJWT };
