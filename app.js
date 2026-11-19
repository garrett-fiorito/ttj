import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

const PORT = 3006;
const DIRNAME = import.meta.dirname;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

dotenv.config();
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

function get_root(req, res) {
    res.render('index');
}

function get_add_job(req, res) {
    res.sendFile(`${DIRNAME}/views/add-job.html`);
}

async function save_job(req, res) {
    let job = req.body;
    console.log(job)

    if (job.is_paid == undefined) {
        job.is_paid = 0;
    } else {
        job.is_paid = 1;    
    }

    try {
        const sql = `INSERT INTO jobs(title, company, location, post_date, close_date, trade, type, is_paid, compensation, description, posting_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [job.title, job.company, job.location, job.post_date, job.close_date, job.trade, job.type, job.is_paid, job.compensation, job.description, job.posting_link];
        let [result, fields] = await pool.execute(sql, params);
        console.log(result.insertId);
        [result] = await pool.execute(`SELECT * FROM jobs WHERE id = ?`, [result.insertId]);
        job.uuid = result[0].uuid;
        res.render('confirmation', { job });
    } catch (err) {
        console.log(err);
        res.status(500).json({"error":"Database error, try again"});
    }
}

app.get('/', get_root);
app.get('/add-job', get_add_job);
app.post('/submit-job', save_job);

app.listen(PORT, () => {console.log("Server started")});