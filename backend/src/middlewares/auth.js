const { decodeJWT } = require("../helpers/jwt.helper.js");

const authorization = async (req, res, next) => {
	try {
		const token = req.cookies.auth_token;

		console.log(token);

		if (!token) throw new Error("No token provided");

		const data = await decodeJWT(token);

		req.userId = data.id;
		req.username = data.username;

		return next();
	} catch (e) {
		console.error(e);
		return res.sendStatus(401);
	}
};

module.exports = authorization;
