const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');



app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'trendstore'
});

connection.connect();

app.get('/api/products', (req, res) => {

    const query = 'SELECT * FROM products';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});


app.get('/api/category/id', (req, res) => {

    const categoryId = parseInt(req.query.CategoryID);

    if (isNaN(categoryId)) {
        return res.status(400).json({ error: 'Invalid CategoryID' });
    }
    const query = 'SELECT * FROM products WHERE CategoryID = ?';
    connection.query(query, [categoryId], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

app.get('/api/categories', (req, res) => {
    const query = 'SELECT * FROM ProductCategories';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/api/product-ratings', (req, res) => {

    const query = 'SELECT * FROM ratings';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Endpoint to add an item to the wishlist
app.post('/addToWishlist', (req, res) => {
    const product = req.body;

    // Extract relevant properties from the product object
    const { ProductName, Prod_Description, ImagePath, Rating, DiscountedPrice, Price } = product;

    // Construct the SQL query with explicit columns
    const sql = 'INSERT INTO wishlist (ProductName, Prod_Description, ImagePath, Rating, DiscountedPrice, Price) VALUES (?, ?, ?, ?, ?, ?)';

    // Execute the query with parameters
    connection.query(sql, [ProductName, Prod_Description, ImagePath, Rating, DiscountedPrice, Price], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
app.get('/api/getWishlistItems', (req, res) => {

    const query = 'SELECT * FROM wishlist';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
// Endpoint to remove an item from the wishlist
app.delete('/removeFromWishlist/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    connection.query('DELETE FROM wishlist WHERE id = ?', itemId, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
// Endpoint to add an item to the cart
app.post('/addToCart', (req, res) => {
    const product = req.body;

    // Extract relevant properties from the product object
    const { ProductName, Prod_Description, ImagePath, Rating, DiscountedPrice, Price } = product;

    // Construct the SQL query with explicit columns
    const sql = 'INSERT INTO cart (ProductName, Prod_Description, ImagePath, Rating, DiscountedPrice, Price) VALUES (?, ?, ?, ?, ?, ?)';

    // Execute the query with parameters
    connection.query(sql, [ProductName, Prod_Description, ImagePath, Rating, DiscountedPrice, Price], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/api/getCartItems', (req, res) => {

    const query = 'SELECT * FROM cart';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Endpoint to remove an item from the cart
app.delete('/api/removeCartItem/:itemId', (req, res) => {
    const itemId = req.params.itemId;

    const query = 'DELETE FROM cart WHERE id = ?';
    connection.query(query, [itemId], (error, results) => {
        console.log(results);
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Item removed from the cart');
        }
    });
});

// Endpoint to clear the entire cart
app.delete('/api/clearCart', (req, res) => {

    const query = 'DELETE FROM cart';
    connection.query(query, (error, results) => {
        console.log(results);
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Cart cleared');
        }
    });
});

// API endpoint to update product quantity
app.put('/products/:productId', (req, res) => {
    const productId = req.params.ProductID;
    const newQuantity = req.body.quantity;

    const updateQuery = 'UPDATE products SET quantity = ? WHERE ProductID = ?';

    connection.query(updateQuery, [newQuantity, productId], (err, result) => {
        console.log(result)
        if (err) {
            console.error('Error updating quantity:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.json({ message: 'Quantity updated successfully' });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
