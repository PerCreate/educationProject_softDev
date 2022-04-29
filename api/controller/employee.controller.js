const db = require('../db');

class Employee {
	async createEmployee(req, res) {
		const {
			name,
			position,
			teamId
		} = req.body;
		try {
			var newEmployee = await db.query(`INSERT INTO employee (name,position) values ($1, $2) RETURNING *`, [name, position]);
		} catch (e) {
			console.log(e);
		}

		res.send({ newEmployee: newEmployee.rows[0] });
	}

	async getEmployees(req, res) {
		try {
			var allEmployees = await db.query(`SELECT * FROM employee`);
		} catch (e) {
			console.log(e);
		}

		if (!allEmployees) {
			res.status(400).send({ error: "Something went wrong." });
			throw new Error("Something went wrong.");
		}

		res.send({ employees: allEmployees.rows });
	}

	async deleteEmployee(req, res) {
		const { id } = req.body;

		console.log(req.body);
		res.send({});
	}
}

module.exports = new Employee();