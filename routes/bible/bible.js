import pool from "../../data/databaseConnection.js";

const BibleTeachings = (req,res) => {
    const QueryCommand = "select * from maneno_biblia"
    pool.query(QueryCommand, (err, data) => {
    if (err) {
        res.status(500).json({error: err.code});
        return;
        }
        return res.json(data);
})
}

export default BibleTeachings;