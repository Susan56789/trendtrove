CREATE DATABASE trendstore;
USE trendstore;

CREATE TABLE products (
prod_ID INT PRIMARY KEY, prod_name VARCHAR(200), cat_name VARCHAR(200), prod_description VARCHAR(300),
prod_specs VARCHAR(1000), image BLOB, quantity INT, ratingID INT, price VARCHAR(200), discounted VARCHAR(200));

CREATE TABLE category(
cat_id INT PRIMARY KEY auto_increment, cat_name VARCHAR(200));

CREATE TABLE orders (
order_ID INT PRIMARY KEY auto_increment, user_id INT, prod_ID INT, order_day date);

CREATE TABLE new_user (
user_id INT primary key auto_increment, f_name varchar(200), l_name varchar(200), email varchar(200), order_ID INT); 