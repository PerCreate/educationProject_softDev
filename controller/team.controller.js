const db = require('../db');

class Team {
	async createTeam(req, res) {
		const {
			name,
			employees,
		} = req.body;

		const newTeam = await db.query(`INSERT INTO team (name) values ($1) RETURNING *`, [name]);
		const newTeamId = newTeam.rows[0].id;

		await db.query(`UPDATE employee SET team_id = ${newTeamId} WHERE id IN(${employees.join(',')})`);

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

		const employees = req.body.employees;

		const allTeams = await db.query(
			`SELECT * FROM team`
		);

		if (!allTeams) {
			res.status(400).send({ error: "Something went wrong." });
			throw new Error("Something went wrong.");
		}

		const refAllTeams = await Promise.all(allTeams.rows.map(async ({ id, name, completed_orders, current_orders }) => {
			const searchedEmployees = await db.query(`SELECT name, position FROM employee WHERE team_id = '${id}'`);
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