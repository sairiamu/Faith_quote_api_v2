import pool from "../../data/databaseConnection.js";

import express from 'express'

//dotenv.config();
const app = express();
app.use(express.json());

const quranTeachings = (req,res) => {
    const QueryCommand = "select * from quran_quotes"
    pool.query(QueryCommand, (err, data) => {
    if (err) {
        console.log(err);
        }
        return res.json(data)

})
}

export default quranTeachings;