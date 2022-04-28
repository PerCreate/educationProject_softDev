const db = require('../db');

class Team {
	async createTeam(req, res) {
		const {
			name,
			employees,
		} = req.body;

		const newTeam = await db.query(`INSERT INTO team (name,employees) values ($1, $2) RETURNING *`, [name, employees]);

		res.send({ newTeam: newTeam.rows[0] });
	}

	async deleteTeam(req, res) {
		const { id } = req.body;

		console.log(req.body);
		res.send({});
	}

	async updateTeam(req, res) {
		const { id } = req.body;

		console.log(req.body);
		res.send({});
	}

	async getTeams(req, res) {

		const allTeams = await db.query(
			`SELECT * FROM team`
		);

		if (!allTeams) {
			res.status(400).send({ error: "Something went wrong." });
			throw new Error("Something went wrong.");
		}

		const refAllTeams = await Promise.all(allTeams.rows.map(async ({ id, name, completed_orders, current_orders, employees }) => {
			const searchedEmployees = await db.query(`SELECT name, position FROM employee WHERE id IN(${employees.join(',')})`);
			const employeesNames = searchedEmployees.rows.map(({ name, position }) => `${name} | ${position}`);

			return {
				id,
				name,
				employees: employeesNames,
				currentOrders: current_orders,
				finishedOrders: completed_orders
			};
		}));

		res.send({ teams: refAllTeams });
	}
}

module.exports = new Team();