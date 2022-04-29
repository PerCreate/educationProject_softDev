create Table client(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	phone VARCHAR(255) NOT NULL,
	email VARCHAR(255),
	status VARCHAR(255),
	isadmin BOOLEAN
);

create Table application(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	phone VARCHAR(255) NOT NULL,
	email VARCHAR(255),
	comment VARCHAR(255),
	service VARCHAR(255)
);

create Table team(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);

create Table employee(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	position VARCHAR(255) NOT NULL,
	team_id INTEGER,
	FOREIGN KEY (team_id) REFERENCES team (id)
);

create Table current_orders(
	id SERIAL PRIMARY KEY,
	date_start VARCHAR(255) NOT NULL,
	date_finish VARCHAR(255) NOT NULL,
	amount VARCHAR(255) NOT NULL,
	client_id INTEGER NOT NULL,
	team_id INTEGER,
	FOREIGN KEY (client_id) REFERENCES client (id),
	FOREIGN KEY (team_id) REFERENCES team (id)
);

create Table completed_orders(
	id SERIAL PRIMARY KEY,
	date_start VARCHAR(255) NOT NULL,
	date_finish VARCHAR(255) NOT NULL,
	client_id INTEGER NOT NULL,
	team_id INTEGER NOT NULL,
	amount VARCHAR(255) NOT NULL,
	FOREIGN KEY (client_id) REFERENCES client(id),
	FOREIGN KEY (team_id) REFERENCES team(id)
);
