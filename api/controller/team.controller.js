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

		res.send({ teams: allTeams.rows });
	}
}

module.exports = new Team();