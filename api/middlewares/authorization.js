const jwt = require('jsonwebtoken');


const authorization = (req, res, next) => {
	const { email } = req.body;

	jwt.sign({ email }, 'secret');
};
