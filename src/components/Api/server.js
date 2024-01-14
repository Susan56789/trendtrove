const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: 'https://trendtrove.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const connection = mysql.createPool({
    host: 'worldempiresafaris.co.ke',
    user: 'worldemp_trendy',
    password: 'Trend@2024',
    database: 'worldemp_trendtrove',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


app.options('/api/products', cors());

app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM products';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
        console.log(results)
    });
});


/// Define the endpoint for fetching product details
app.get('/product/:productName', async (req, res) => {
    const { productName } = req.params;
    const query = 'SELECT * FROM Products WHERE ProductName = ?';

    connection.query(query, [productName], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.json(results);
    });
});



app.get('/api/category/id', async (req, res) => {
    const { CategoryID } = req.query;
    const query = `SELECT * FROM Products WHERE CategoryID = ${CategoryID}`;

    connection.query(query, (error, results) => {

        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.json(results);
    });
});

app.options('/api/categories', cors());
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
app.get('/api/allWishlistItems', (req, res) => {

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

app.get('/api/allCartItems', (req, res) => {

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
