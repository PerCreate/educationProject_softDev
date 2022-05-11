const db = require('../db');

class CurrentOrders {
	async createOrder(req, res) {
		const {
			linkDescription = "пусто",
			clientId,
			startDate,
			finishDate,
			amount,
			teamId,
			name
		} = req.body;

		try {
			var newOrder = await db.query(
				`INSERT INTO current_orders (linkdescription,client_id,date_start,date_finish,amount,team_id,name) values ($1, $2, $3, $4, $5, $6,$7) RETURNING *`,
				[linkDescription, clientId, startDate, finishDate, amount, teamId, name]
			);
			res.send({ created: true, newOrder: newOrder.rows[0] });
		} catch (e) {
			console.log(e);
			res.status(200).send({ created: true, newOrder: newOrder.rows[0] });
		}

	}

	async deleteOrder(req, res) {
		const { id } = req.body;

		console.log(req.body);
		res.send({});
	}

	async getOrders(req, res) {
		try {
			var allOrders = await db.query(`SELECT * FROM current_orders`);
		} catch (e) {
			console.log(e);
		}

		if (!allOrders) {
			res.status(400).send({ error: "Something went wrong." });
			throw new Error("Something went wrong.");
		}

		res.send({ orders: allOrders.rows });
	}
}

module.exports = new CurrentOrders();