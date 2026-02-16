import pool from "../../data/databaseConnection.js";

const quranTeachings = (req,res) => {
    const QueryCommand = "select * from quran_quotes"
    pool.query(QueryCommand, (err, data) => {
    if (err) {
        res.status(500).json({error: err.message});
        return;
        }
        return res.json(data);
})
}

export default quranTeachings;