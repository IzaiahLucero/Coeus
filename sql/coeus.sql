
DROP TABLE IF EXISTS customer;

CREATE TABLE customer (
customer_id UUID NOT NULL PRIMARY KEY,
customer_name VARCHAR(20) NOT NULL UNIQUE,
customer_phone VARCHAR(32),
customer_email VARCHAR(64),
customer_hash CHAR(97) NOT NULL,
customer_activation_token CHAR(32)
);