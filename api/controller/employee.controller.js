const db = require('../db');

class Employee {
	async createEmployee(req, res) {
		const {
			name,
			surname,
			position,
			teamId
		} = req.body;

		const newEmployee = await db.query(`INSERT INTO employee (name,surname,position) values ($1, $2, $3) RETURNING *`, [name, surname, position]);

		res.send({ newEmployee: newEmployee.rows[0] });
	}

	async getEmployees(req, res) {
		const allEmployees = await db.query(`SELECT * FROM employee`);

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