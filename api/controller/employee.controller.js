class Employee {
	async createEmployee(req, res) {
		const {
			name,
			surname,
			position,
			teamId
		} = req.body;

		console.log(req.body);
		res.send({});
	}

	async deleteEmployee(req, res) {
		const { id } = req.body;

		console.log(req.body);
		res.send({});
	}
}

module.exports = new Employee();