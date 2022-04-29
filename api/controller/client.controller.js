const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { Cookie } = require('express-session');

const expiredDays = 180;
const cookieConfig = () => ({
	sameStrict: 'strict',
	maxAge: expiredDays * 24 * 60 * 60 * 1000,
	httpOnly: true
});
class ClientController {
	async createClient(req, res) {
		const {
			name,
			phone,
			email,
			password,
			passwordConfirm,
			status = "simple"
		} = req.body;

		try {
			var currentClient = await db.query(
				`SELECT email FROM client WHERE email = '${email}'`
			);

		} catch (e) {
			console.log(e);
		}

		if (currentClient.rows.length > 0) {
			return res.status(400).send({ error: 'This email already used.' });
		}

		if (name.length < 6) {
			return res.status(400).send({ error: 'Min length of the name is 8.' });
		}

		if (!/^[a-zA-Z ]+$/.test(name)) {
			return res.status(400).send({ error: 'Only letters in the name.' });
		}

		if (phone.length < 9 || phone.length > 24 || !phone.match(/^[0-9\+\-]*$/)) {
			return res.status(400).send({ error: 'Invalid phone number.' });
		}

		if (password.length < 8) {
			return res.status(400).send({ error: 'Min length of the password is 8.' });
		}

		if (!/^[a-zA-Z0-9]+$/.test(password)) {
			return res.status(400).send({ error: 'Only numbers and latin letters is password.' });
		}

		if (password !== passwordConfirm) {
			return res.status(400).send({ error: 'Passwords must match.' });
		}

		const salt = await bcrypt.genSalt(saltRounds);
		const hashPW = await bcrypt.hash(`${password}`, salt);

		try {
			var newClient = await db.query(
				`INSERT INTO client (name, phone, email,password, status) values ($1, $2, $3, $4, $5) RETURNING *`,
				[name, phone, email, hashPW, status]
			);
		} catch (e) {
			console.log(e);
		}


		const token = jwt.sign({ email }, 'secret', { expiresIn: '180d' });

		res.status(202)
			.cookie('token', token, cookieConfig())
			.send({ newClient: newClient.rows[0] });
	}

	async loginClient(req, res) {
		const {
			email,
			password,
		} = req.body;

		try {
			var currentClient = await db.query(
				`SELECT email, password, isadmin FROM client WHERE email = '${email}'`
			);
		} catch (e) {
			console.log(e);
		}

		if (!currentClient || currentClient.rows.length === 0) {
			return res.status(400).send({ error: 'This email not found.' });
		}

		currentClient = currentClient.rows[0];

		const isAuthSuccess = await bcrypt.compare(`${password}`, currentClient.password);

		if (!isAuthSuccess) {
			return res.status(400).send({ error: 'Invalid password.' });
		} else {
			const token = jwt.sign({ email }, 'secret', { expiresIn: '180d' });
			return res
				.status(200)
				.cookie('token', token, cookieConfig(expiredDays))
				.send({ success: true, email, isAdmin: currentClient.isadmin });
		}
	}

	async logoutClient(req, res) {
		const { email } = req.body;

		res.clearCookie("token").send({ success: true });
	}

	async checkSession(req, res, next) {
		const { token } = req.cookies;

		if (token) {
			const { email } = jwt.verify(token, 'secret');

			try {
				var currentClient = await db.query(
					`SELECT email, isadmin FROM client WHERE email = '${email}'`
				);

			} catch (e) {
				console.log(e);
			}

			if (!currentClient || currentClient.rows.length === 0) {
				return res.status(200).send({ client: null });
			} else {
				return res.status(200).send({ client: currentClient.rows[0] });
			}
		} else {
			return res.status(200).send({ client: null });
		}
	}

	async getClients(req, res, next) {
		try {
			var allClients = await db.query(`SELECT * FROM client`);
		} catch (e) {
			console.log(e);
		}

		if (!allClients) {
			res.status(400).send({ error: "Something went wrong." });
			throw new Error("Something went wrong.");
		}

		res.send({ clients: allClients.rows });

	}
}

module.exports = new ClientController();