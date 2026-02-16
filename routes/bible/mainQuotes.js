import pool from "../../data/databaseConnection.js";

const BibleQuotes = (req,res) => {
    const QueryCommand = "select * from quotes "
    pool.query(QueryCommand, (err, data) => {
    if (err) {
        res.status(500).json({error: err.code});
        return;
        }
        return res.json(data);
})
}

export default BibleQuotes;