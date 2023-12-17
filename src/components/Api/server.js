const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');



app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost', // your database server name
    user: 'root', // your database username
    password: '', // your database password
    database: 'trendstore' // your database name
});

connection.connect();

app.get('/api/products', (req, res) => {
    // Perform SQL query to fetch data from the database
    const query = 'SELECT * FROM products';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/api/product-ratings', (req, res) => {
    // Perform SQL query to fetch data from the database
    const query = 'SELECT * FROM ratings';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
