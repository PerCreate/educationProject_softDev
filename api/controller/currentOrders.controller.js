class CurrentOrders {
	async createOrder(req, res) {
		const { id } = req.body;

		console.log(req.body);
		res.send({});
	}

	async deleteOrder(req, res) {
		const { id } = req.body;

		console.log(req.body);
		res.send({});
	}
}

module.exports = new CurrentOrders();