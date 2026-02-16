import pool from "../../data/databaseConnection.js";

const quranQuotes = (req,res) => {
    const QueryCommand = "select * from quran_themes"
    pool.query(QueryCommand, (err, data) => {
    if (err) {
        res.status(500).json({error: err.message});
        return;
        }
        return res.json(data);
})
}

export default quranQuotes;