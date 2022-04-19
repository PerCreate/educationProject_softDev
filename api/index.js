const express = require('express');
const pool = require('./db');

const clientRoutes = require('./routes/client.routes');
const applicationRoutes = require('./routes/application.routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use('/api', [clientRoutes, applicationRoutes]);

app.listen(PORT, () => {
	console.log(PORT);
});