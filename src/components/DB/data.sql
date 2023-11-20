CREATE DATABASE trendstore;
USE trendstore;

CREATE TABLE images (
imageID INT PRIMARY KEY, imageData VARBINARY(255), imageName NVARCHAR(255)); 

CREATE TABLE products (
prod_ID INT PRIMARY KEY, prod_name VARCHAR(200), cat_name VARCHAR(200), prod_description VARCHAR(300),
prod_specs VARCHAR(1000), imageID INT, quantity INT, ratingID INT, price VARCHAR(200), discounted VARCHAR(200));