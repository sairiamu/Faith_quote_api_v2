import express from 'express'
import BibleQuotes from './routes/bible/mainQuotes.js';
import dotenv from 'dotenv'
import quranTeachings from './routes/quran/quran.js';
import quranQuotes from './routes/quran/mainQuote.js';
import BibleTeachings from './routes/bible/bible.js';

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

//bible
app.get("/api/bible/",BibleTeachings);
app.get("/api/bible/quotes/",BibleQuotes);


//quran
app.get("/api/quran/",quranTeachings);
app.get("/api/quran/quotes/",quranQuotes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
export default app;