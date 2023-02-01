CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(1000) NOT NULL,
  firstname VARCHAR(1000) NOT NULL,
  lastname VARCHAR(1000) NOT NULL,
	email VARCHAR(1000), 
	password VARCHAR(1000) NOT NULL,
  age INT NOT NULL,
  gender_identity VARCHAR(1000) DEFAULT 'other',
	gender_interest VARCHAR(1000) DEFAULT 'Everyone',
  tags VARCHAR[],
	bio VARCHAR(1000),
	city VARCHAR(1000),
	country VARCHAR(1000),
	actual_location VARCHAR(1000), /* complete this */
	active SMALLINT DEFAULT 0,
	token varchar(255) NOT NULL DEFAULT 0,
	fame INT NOT NULL DEFAULT 0,
	online SMALLINT DEFAULT 0,
	last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	ip VARCHAR(255),
	latitude NUMERIC,
	longitude NUMERIC,
	profile_picture VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS tags (
	id SERIAL NOT NULL PRIMARY KEY,
  tagname VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS photos ( 
	id SERIAL NOT NULL PRIMARY KEY,
	user_id INT NOT NULL,
	photo VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS chats (
	id SERIAL NOT NULL PRIMARY KEY,
	logged_user INT,
	recipient_user INT,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	unread_messages INT DEFAULT 0,
	last_message_sender INT DEFAULT 0,
	last_message_text VARCHAR(1000)
);