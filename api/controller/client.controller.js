const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
class ClientController {
	async createClient(req, res) {
		const {
			name,
			surname,
			phone,
			email,
			password,
			passwordConfirm,
			status = "simple"
		} = req.body;

		let currentClient = await db.query(
			`SELECT email FROM client WHERE email = '${email}'`
		);

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

		const newClient = await db.query(
			`INSERT INTO client (name,surname, phone, email,password, status) values ($1, $2, $3, $4, $5, $6) RETURNING *`,
			[name, surname, phone, email, hashPW, status]
		);

		res.send({ newClient: newClient.rows[0] });
	}

	async loginClient(req, res) {
		const {
			email,
			password,
		} = req.body;
		console.log(email, password);
		let currentClient = await db.query(
			`SELECT email, password FROM client WHERE email = '${email}'`
		);

		if (!currentClient || currentClient.rows.length === 0) {
			return res.status(400).send({ error: 'This email not found.' });
		}

		currentClient = currentClient.rows[0];

		const isAuthSuccess = await bcrypt.compare(`${password}`, currentClient.password);

		if (!isAuthSuccess) {
			return res.status(400).send({ error: 'Invalid password.' });
		} else {
			return res.status(200).send({ success: true });
		}
	}
}

module.exports = new ClientController();