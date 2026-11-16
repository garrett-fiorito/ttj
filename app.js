import express from 'express';

const PORT = 3006;
const DIRNAME = import.meta.dirname;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

function get_root(req, res) {
    res.render('index');
}

function get_add_job(req, res) {
    res.sendFile(`${DIRNAME}/views/add-job.html`);
}

function save_job(req, res) {
    res.render('confirmation');
}

app.get('/', get_root);
app.get('/add-job', get_add_job);
app.post('/submit-job', save_job);

app.listen(PORT, () => {console.log("Server started")});