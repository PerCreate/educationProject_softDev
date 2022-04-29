const db = require('../db');

class CurrentOrders {
	async createOrder(req, res) {
		const {
			linkDescription,
			clientId,
			startDate,
			finishDate,
			amount,
			teamId
		} = req.body;

		const newOrder = await db.query(
			`INSERT INTO current_orders (linkdescription,client_id,date_start,date_finish,amount,team_id) values ($1, $2, $3, $4, $5, $6) RETURNING *`,
			[linkDescription, clientId, startDate, finishDate, amount, teamId]
		);

		res.send({ created: true, newOrder: newOrder.rows[0] });
	}

	async deleteOrder(req, res) {
		const { id } = req.body;

		console.log(req.body);
		res.send({});
	}

	async getOrders(req, res) {
		const allOrders = await db.query(`SELECT * FROM current_orders`);

		if (!allOrders) {
			res.status(400).send({ error: "Something went wrong." });
			throw new Error("Something went wrong.");
		}

		res.send({ orders: allOrders.rows });
	}
}

module.exports = new CurrentOrders();