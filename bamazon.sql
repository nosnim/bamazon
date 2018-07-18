DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id int(11) AUTO_INCREMENT,
	product_name CHAR(40),
	department_name CHAR(40),
	price int(11),
	stock_qty int(11),
	PRIMARY KEY (item_id)
);

INSERT INTO products
  (product_name, department_name, price, stock_quantity)
VALUES
  ("shoes", "clothing", 30.00, 50),
  ("apple", "produce", 1.00, 500),
  ("towels", "home goods", 5.00, 200),
  ("water bottle", "outdoors", "25.00", 100),
	("sunflower seeds", "product", 3.50, 250),
  ("ski jacket", "outdoors", 100.00, 50),
  ("10W-30 motor oil", "automotive", 4.50, 1000),
  ("Braveheart DVD", "entertainment", 10.00, 100),
  ("Flour / 25lbs", "groceries", 8.50, 50),
  ("pumpkins", "produce", 3.99, 100);

