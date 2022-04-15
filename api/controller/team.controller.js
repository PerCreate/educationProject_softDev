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
}

module.exports = new Team();