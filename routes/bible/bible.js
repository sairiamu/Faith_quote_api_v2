import pool from "../../data/databaseConnection.js";
import express from 'express'

const app = express();
app.use(express.json());

const BibleTeachings = (req,res) => {
    const QueryCommand = "select * from maneno_biblia"
    pool.query(QueryCommand, (err, data) => {
    if (err) {
        return res.json(err.code)
        }
        return res.json(data);
        // res.render('test', {data:data})
})
}

export default BibleTeachings;