
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//MySql Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Xiritor16@',
    database: 'network_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL Database');
});

app.post('/submit-form', (req, res) => {
    const { first_name, last_name, email, reason } = req.body;

    if (!first_name || !last_name || !email || !reason) {
        return res.status(400).send('All fields are required.');
    }

    const query = 'INSERT INTO users (first_name, last_name, email, reason) VALUES (?, ?, ?, ?)';
    (query, [first_name, last_name, email, reason], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Database error');
        }
        res.send('Form submitted successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
