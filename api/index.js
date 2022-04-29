const express = require('express');
const pool = require('./db');
const cookieParser = require('cookie-parser');

const clientRoutes = require('./routes/client.routes');
const applicationRoutes = require('./routes/application.routes');
const teamsRoutes = require('./routes/team.routes');
const orderRoutes = require('./routes/currentOrders.routes');
const employeesRoutes = require('./routes/employee.routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Content-Security-Policy', `default-src 'self'; style-src 'unsafe-inline' 'self'; img-src 'self' data:;`);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(express.static("../frontend/build"));
if (process.env.NODE_ENV === "production") {
	app.use(express.static("./frontend/build"));
}

app.use('/api', [clientRoutes, applicationRoutes, teamsRoutes, orderRoutes, employeesRoutes]);

app.listen(PORT, () => {
	console.log(PORT);
});