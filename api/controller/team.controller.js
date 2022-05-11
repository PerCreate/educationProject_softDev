const db = require('../db');

class Team {
	async createTeam(req, res) {
		const {
			name,
			employees,
		} = req.body;

		try {
			var newTeam = await db.query(`INSERT INTO team (name) values ($1) RETURNING *`, [name]);
			const newTeamId = newTeam.rows[0].id;

			res.send({ newTeam: newTeam.rows[0] });
		} catch (e) {
			console.log(e);
			res.status(400).send({ newTeam: newTeam.rows[0] });
		}
	}

	async deleteTeam(req, res) {
		const { id } = req.body;

		// try {
		// 	await db.query(`UPDATE employee SET team_id = NULL WHERE team_id = ${id}`);
		// 	await db.query(`UPDATE current_orders SET team_id = NULL WHERE team_id = ${id}`);
		// 	await db.query(`UPDATE completed_orders SET team_id = NULL WHERE team_id = ${id}`);
		// 	await db.query(`DELETE FROM team WHERE id = ${id}`);
		// } catch (e) {
		// 	console.log(e);
		// }

		res.send({ successful: true });
	}

	async editTeam(req, res) {
		const {
			name,
			employees,
			id,
			currentOrder
		} = req.body;

		if (typeof currentOrder !== 'string') res.status(400).send({ error: "Something went wrong." });

		try {
			await db.query(`UPDATE employee SET team_id = NULL WHERE team_id = ${id}`);
			employees.length && await db.query(`UPDATE employee SET team_id = ${id} WHERE id IN(${employees.join(',')})`);
			await db.query(`UPDATE current_orders SET linkdescription = '${currentOrder}' WHERE team_id = ${id}`);
			await db.query(`UPDATE team SET name = '${name}' WHERE id = ${id}`);
		} catch (e) {
			console.log(e);
		}

		res.send({ successful: true });
	}

	async getTeam(req, res) {
		const { id } = req.body;

		try {
			var team = await db.query(
				`SELECT * FROM team WHERE id=${id}`
			);
		} catch (e) {
			console.log(e);
		}

		if (!team) {
			res.status(400).send({ error: "Something went wrong." });
			throw new Error("Something went wrong.");
		}

		const refTeam = await TeamRefactor(team);
		res.send({ team: { ...refTeam[0] } });
	}

	async getTeams(req, res) {
		const employees = req.body.employees;

		try {
			var allTeams = await db.query(
				`SELECT * FROM team`
			);
		} catch (e) {
			console.log(e);
		}

		if (!allTeams) {
			res.status(400).send({ error: "Something went wrong." });
			throw new Error("Something went wrong.");
		}

		const refTeams = await TeamRefactor(allTeams);
		res.send({ teams: refTeams });
	}
}

const TeamRefactor = async (allTeams) => {
	const refAllTeams = await Promise.all(allTeams.rows.map(async ({ id, name }) => {
		try {
			var currentOrder = await db.query(
				`SELECT linkdescription FROM current_orders WHERE team_id=${id}`
			);
			const searchedEmployees = await db.query(`SELECT name, position,id FROM employee WHERE team_id = '${id}'`);
			const employeesNames = searchedEmployees.rows.map(({ name, position, id }) => ({ label: `${name} | ${position}`, value: id }));

			return {
				id,
				name,
				employees: employeesNames,
				currentOrder: currentOrder[0]
			};
		} catch (e) {
			console.log(e);
		}
	}));

	return refAllTeams;
};

module.exports = new Team();