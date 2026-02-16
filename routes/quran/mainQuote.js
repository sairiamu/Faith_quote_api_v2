import pool from "../../data/databaseConnection.js";

import express from 'express'

//dotenv.config();
const app = express();
app.use(express.json());

const quranQuotes = (req,res) => {
    const QueryCommand = "select * from quran_themes"
    pool.query(QueryCommand, (err, data) => {
    if (err) {
        console.log(err);
        }
        return res.json(data)
})
}

export default quranQuotes;