const db = require('../db');

class Team {
	async createTeam(req, res) {
		const { id } = req.body;

		console.log(req.body);
		res.send({});
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