CREATE DATABASE trendstore;
USE trendstore;

-- Table: ProductCategories
CREATE TABLE ProductCategories (
    CategoryID INT PRIMARY KEY,
    CategoryName VARCHAR(255) NOT NULL,
    Cat_Description varchar(1000),
    InmageUrl VARCHAR(255)
);

INSERT INTO ProductCategories (CategoryID, CategoryName,Cat_Description, InmageUrl)
VALUES(1,'Shoes','Step into style with our diverse collection of footwear in the shoe category.
 Discover a world where fashion meets comfort, where every step is a statement. 
 From casual sneakers that redefine street style to elegant heels that elevate your evening look,
 our shoe category has something for every occasion.','/products/shoe.png'),
 (2,'Laptops','Explore our Laptops 
 category and elevate your digital lifestyle with devices 
 that empower you to work, play, and create with unparalleled efficiency.','/products/Laptops.png'),
 (3,'Phones','Elevate your communication experience and embrace the future of mobility with our Phones category. Explore, choose, and embark on a journey of technological excellence with devices that redefine the way we connect in the digital age','/products/phones.png'),
 (4,'Handbags','Indulge in the luxurious textures of premium leather or opt for the versatility of trendy canvas and fabric designs. Our handbags come in a spectrum of colors, patterns, and styles, ensuring there is something for every fashion-forward individual.','/products/Handbags.png'),
 (5,'Watches','Whether you seek a watch that makes a bold statement or one that discreetly complements your style, our Watches category is a curated journey through the world of horology. Explore the art of timekeeping and find the perfect wrist companion that suits your lifestyle.','/products/Watches.png'),
 (6,'Ladies wear','Browse our Ladies Wear collection today and embrace the fusion of fashion, comfort, and confidence. Your journey to timeless style begins here.','/products/ladywear.png'),
 (7,'Accessories','Enhance your style and functionality with our diverse range of accessories. Discover the perfect accents to complement your outfits and lifestyle. From timeless classics to trendy essentials, our Accessories Collection has something for everyone.','/products/Accessories.png'),
 (8,'Mens wear','Shop now and redefine your wardrobe with our meticulously curated Mens Wear collection. Your journey to sartorial excellence begins here.','/products/menwear.png'),
 (9,'TVs','Upgrade your home entertainment setup with a TV from our curated collection and embark on a journey of visual delight and unparalleled entertainment. Browse our selection today and redefine the way you experience television.','/products/Tvs.png');

-- Table: Products
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    CategoryID INT,
    quantity INT,
    CategoryName VARCHAR(255),
    ProductName VARCHAR(255) NOT NULL,
    Price INT NOT NULL,
    DiscountedPrice INT,
    Prod_Description Varchar(1000),
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
SELECT * From Products;
-- Create a trigger to automatically update categoryName in products table
DELIMITER //
CREATE TRIGGER update_category_name
BEFORE INSERT ON Products
FOR EACH ROW
BEGIN
    SET NEW.CategoryName = (SELECT CategoryName FROM ProductCategories WHERE CategoryID = NEW.CategoryID);
END;
//
DELIMITER ;


-- Create a table for wishlist items
CREATE TABLE wishlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ProductID INT,
  ProductName VARCHAR(255) ,
  Prod_Description TEXT,
  ImagePath VARCHAR(255),
  Rating DECIMAL(3, 2),
Price INT,
DiscountedPrice INT,
  CONSTRAINT fk_products
        FOREIGN KEY (ProductID)
        REFERENCES Products(ProductID)
);
DROP TABLE Products;
-- Create a table for cart items
CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ProductID INT,
  ProductName VARCHAR(255),
  Prod_Description TEXT,
  ImagePath VARCHAR(255),
  Rating DECIMAL(3, 2),
  Price INT,
DiscountedPrice INT,
  CONSTRAINT fk_products
        FOREIGN KEY (ProductID)
        REFERENCES Products(ProductID)
);
 REPAIR TABLE cart;


CREATE TABLE Customer (
  CustomerID INT AUTO_INCREMENT PRIMARY KEY,
  Fname VARCHAR(100) NOT NULL,
  Email VARCHAR(100) NOT NULL,
  Town VARCHAR(255),
 StreetName VARCHAR(255),
  Phone VARCHAR(20),
  Country VARCHAR(100),
  Passwrd VARCHAR(255),
  ImageUrl VARCHAR(255),
  Gender VARCHAR(255)
);

CREATE TABLE order_table (
  orderID INT AUTO_INCREMENT PRIMARY KEY,
  CustomerID INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_fee DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE order_item (
  itemID INT AUTO_INCREMENT PRIMARY KEY,
  orderID INT NOT NULL,
  ProductID INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (orderID) REFERENCES order_table(orderID),
  FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
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
