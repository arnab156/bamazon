DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
   id INTEGER(11) AUTO_INCREMENT NOT NULL,
   product_name VARCHAR(100) NOT NULL,
   department_name VARCHAR(100) NOT NULL,
   price DECIMAL(10,2) NULL,
   stock_quantity INTEGER(10) NULL,
   PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("Jeans", "Mens", 44.99,10);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("Jacket", "Mens", 47.99,10);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("Shirt", "Mens", 39.99,5);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("Sweater", "Mens", 44.99,3);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("Shoes", "Mens", 94.99,2);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("Jeans", "Womens", 44.99,10);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("Skirts", "Womens", 39.99,10);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("Sweaters", "Womens", 34.99,10);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("Game", "Kids", 94.99,10);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES ("Sweater", "Kids", 44.99,10);

SELECT * FROM products;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Letmein@156';