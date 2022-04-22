const jwt = require('jsonwebtoken');
const db = require('../db');


const authorization = async (req, res, next) => {
	const { token } = req.cookies;

	if (token) {
		const { email } = jwt.verify(token, 'secret');

		let currentClient = await db.query(
			`SELECT email, isadmin FROM client WHERE email = '${email}'`
		);

		if (!currentClient || currentClient.rows.length === 0) {
			return res.status(400).send({ error: 'You can\'t do this. You haven\'t admin access.' });
		} else {
			next();
		}
	} else {
		return res.status(400).send({ error: 'You can\'t do this. You haven\'t admin access.' });
	}
};

module.exports = authorization;