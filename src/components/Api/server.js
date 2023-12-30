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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
