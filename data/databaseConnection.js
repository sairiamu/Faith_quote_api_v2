import mysql2 from 'mysql2'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config();
const PORT = process.env.PORT
const pool = mysql2.createPool({
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
});
console.log(PORT)
export default pool;
