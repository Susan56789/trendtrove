CREATE DATABASE trendstore;
USE trendstore;

-- Table: ProductCategories
CREATE TABLE ProductCategories (
    CategoryID INT PRIMARY KEY,
    CategoryName VARCHAR(255) NOT NULL
);
INSERT INTO ProductCategories (CategoryID, CategoryName)
VALUES(1,'Shoes'),(2,'Laptops'),(3,'Phones'),(4,'Handbags'),(5,'Watches'),(6,'Ladies wear'),(7,'Accessories'),(8,'Mens wear');
INSERT INTO ProductCategories (CategoryID, CategoryName)
VALUES(9,'TVs');
-- Table: Products
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    CategoryID INT,
    ProductName VARCHAR(255) NOT NULL,
    Price INT NOT NULL,
    DiscountedPrice INT,
    Rating DECIMAL(3, 2),
    ImagePath VARCHAR(255), -- Store the path to the image on the local file system
    CONSTRAINT fk_category
        FOREIGN KEY (CategoryID)
        REFERENCES ProductCategories(CategoryID)
);

INSERT INTO Products (ProductID,CategoryID, ProductName, Price,DiscountedPrice,Rating, ImagePath)
VALUES (1,1, 'Red Nike Shoes', 6000,5899,4.9, '/products/rednikeshoe.png'),
(2,4, 'Brown Lady Handbag', 4995,0,3.5, '/products/brownhandbag.png'),
(3,9, '32 inch LG Smart TV', 13999,13499,4.3, '/products/lgtv.png'),
(4,6, 'Green fancy dress', 1250,0,5.0, '/products/greendress.png'),
(5,2,'HP Laptop', 29999,0,3.2, '/products/HPLaptop.png'),
(6,1, 'Gey Nike Shoes', 6999,6499,4.0, '/products/greynike.png'),
(7,4, 'Black Lady Handbag', 2995,0,4.2, '//products/blackhandbag.png'),
(8,9, '42 inch LG Smart TV', 19999,0,4.7, '/products/lgtv.png'),
(9,6, 'Red fancy dress', 1950,0,3.9, '/products/redfancydress.png'),
(10,1, 'Red blue floral heels', 3999,0,4.8, '/products/floralheels.png'),
(11,9, '42 inch Android Smart TV', 39999,35999,4.5, '/products/lgtv.png'),
(12,5, 'Samsung Galaxy Watch 5', 25000,0,4.7, '/products/Samsung-Galaxy-Watch-5-B.jpg')
;


-- Table: Customers
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255)  NOT NULL
);

-- Table: Orders
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE NOT NULL,
    CONSTRAINT fk_customer
        FOREIGN KEY (CustomerID)
        REFERENCES Customers(CustomerID)
);

-- Table: OrderItems
CREATE TABLE OrderItems (
    OrderItemID INT PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_order
        FOREIGN KEY (OrderID)
        REFERENCES Orders(OrderID),
    CONSTRAINT fk_product
        FOREIGN KEY (ProductID)
        REFERENCES Products(ProductID)
);

-- Table: Ratings
CREATE TABLE Ratings (
    RatingID INT PRIMARY KEY,
    ProductID INT,
    CustomerID INT,
    Rating DECIMAL(3, 2) NOT NULL,
    CONSTRAINT fk_product_rating
        FOREIGN KEY (ProductID)
        REFERENCES Products(ProductID),
    CONSTRAINT fk_customer_rating
        FOREIGN KEY (CustomerID)
        REFERENCES Customers(CustomerID)
);

-- Table: Comments
CREATE TABLE Comments (
    CommentID INT PRIMARY KEY,
    ProductID INT,
    CustomerID INT,
    CommentText TEXT,
    CONSTRAINT fk_product_comment
        FOREIGN KEY (ProductID)
        REFERENCES Products(ProductID),
    CONSTRAINT fk_customer_comment
        FOREIGN KEY (CustomerID)
        REFERENCES Customers(CustomerID)
);
