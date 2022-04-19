const db = require('../db')

class Application {
	async createApplication(req, res, next) {
		const {
			name,
			phone,
			email,
			comment
		} = req.body;

		if (name.length < 6) {
			return res.status(400).send({ error: 'Min length of the name is 8.' });
		}

		if (!name.match(/^[a-zA-Z ]+$/)) {
			return res.status(400).send({ error: 'Only letters in the name.' });
		}

		if (phone.length < 9 || phone.length > 24 || !phone.match(/^[0-9\+\-]*$/)) {
			return res.status(400).send({ error: 'Invalid phone number.' });
		}

		if (name.length < 6) {
			return res.status(400).send({ error: 'Min length of the name is 8.' });
		}

		const newApplication = await db.query(`INSERT INTO application (name, phone, email, comment) values ($1, $2, $3, $4) RETURNING *`, [name,phone,email,comment]);

		res.send({ created: true, newApplication: newApplication.rows[0] });
	}

	async deleteApplication(req, res) {
		const { id } = req.body;

		console.log(req.body);
		res.send({});
	}
}

module.exports = new Application();