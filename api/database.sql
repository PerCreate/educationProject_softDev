create Table client(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	surname VARCHAR(255),
	password VARCHAR(255),
	phone VARCHAR(255),
	email VARCHAR(255),
	status VARCHAR(255),
	isadmin BOOLEAN,
);
	current_orders INTEGER,
	completed_orders INTEGER,
	FOREIGN KEY (current_orders) REFERENCES current_orders (id),
	FOREIGN KEY (completed_orders) REFERENCES completed_orders (id)

create Table current_orders(
	id SERIAL PRIMARY KEY,
	date_start VARCHAR(255),
	date_finish VARCHAR(255),
	client_id INTEGER,
	amount VARCHAR(255),
	team_id INTEGER
);
	FOREIGN KEY (client_id) REFERENCES client (id),
	FOREIGN KEY (team_id) REFERENCES team (id)

create Table completed_orders(
	id SERIAL PRIMARY KEY,
	date_start VARCHAR(255),
	date_finish VARCHAR(255),
	client_id INTEGER,
	amount VARCHAR(255),
	team_id INTEGER
);
	FOREIGN KEY (client_id) REFERENCES client (id),
	FOREIGN KEY (team_id) REFERENCES team (id)

create Table employee(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	surname VARCHAR(255),
	position VARCHAR(255)
);
	team_id INTEGER
	FOREIGN KEY (team_id) REFERENCES team (id)

create Table team(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	employees INTEGER[],
	current_orders INTEGER,
	completed_orders INTEGER
);
	FOREIGN KEY (employees) REFERENCES employee (id),
	FOREIGN KEY (current_orders) REFERENCES current_orders (id),
	FOREIGN KEY (completed_orders) REFERENCES completed_orders (id)

create Table application(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	phone VARCHAR(255),
	email VARCHAR(255),
	comment VARCHAR(255),
	service VARCHAR(255)
);