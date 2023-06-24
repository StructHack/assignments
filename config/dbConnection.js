// get the client
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Create a connection pool

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
}).promise();


module.exports = pool;