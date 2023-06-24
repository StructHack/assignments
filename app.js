const express = require('express');
const dotenv = require('dotenv');
const app = express();
const pool = require('./config/dbConnection')
const authRoutes = require('./routes/authRoutes')
const cookieParser= require('cookie-parser');
const cors = require('cors');


/* 
    extract environment files
*/
    dotenv.config();

/*
    create database connection
*/

pool.getConnection()
.then(conn=>{
    console.log('Database connected')
    app.listen(process.env.PORT,(req,res)=>{
        console.log(`listening on port ${process.env.PORT}`);
    })
})
.catch(err=>{
    console.log('Error connecting to the database.')
})

/*
    Middlewares
*/

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:'http://localhost:5173', credentials:true}))

/*
    Routes
*/
app.get('/',(req, res)=>{
    res.status(200).send('Welcome');
})

app.use(authRoutes)


