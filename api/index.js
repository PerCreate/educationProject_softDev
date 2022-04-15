const express = require('express');
const pool = require('./db');

const clientRoutes = require('./routes/client.routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/api', [clientRoutes]);

app.listen(PORT, () => {
	console.log(PORT);
});