const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: '*',
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


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 30000,
    queueLimit: 0
});

connection.connect();


app.get('/api/products', async (req, res) => {
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM Products');
        res.json(rows);
        console.log("Fields: ", fields);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/product/:productName', async (req, res) => {
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


app.post('/api/addToWishlist', (req, res) => {
    const product = req.body;


    const { ProductName, Prod_Description, ImagePath, Rating, DiscountedPrice, Price } = product;


    const sql = 'INSERT INTO wishlist (ProductName, Prod_Description, ImagePath, Rating, DiscountedPrice, Price) VALUES (?, ?, ?, ?, ?, ?)';


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

app.delete('/api/removeFromWishlist/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    connection.query('DELETE FROM wishlist WHERE id = ?', itemId, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

app.post('/api/addToCart', (req, res) => {
    const product = req.body;


    const { ProductName, Prod_Description, ImagePath, Rating, DiscountedPrice, Price } = product;


    const sql = 'INSERT INTO cart (ProductName, Prod_Description, ImagePath, Rating, DiscountedPrice, Price) VALUES (?, ?, ?, ?, ?, ?)';


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


app.delete('/api/removeCartItem/:itemId', (req, res) => {
    const itemId = req.params.itemId;

    const query = 'DELETE FROM cart WHERE id = ?';
    connection.query(query, [itemId], (error, results) => {
        console.log(results)
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Item removed from the cart');
        }
    });
});


app.delete('/api/clearCart', (req, res) => {

    const query = 'DELETE FROM cart';
    connection.query(query, (error, results) => {
        console.log(results)
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Cart cleared');
        }
    });
});


app.put('/api/products/:productId', (req, res) => {
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
        console.log(result)
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
