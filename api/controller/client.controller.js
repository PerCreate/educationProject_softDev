class ClientController {
	async createClient(req, res) {
		const {
			name,
			surname,
			phone,
			email,
			status = "simple"
		} = req.body;

		console.log(req.body);
		res.send({});
	}
}

module.exports = new ClientController();