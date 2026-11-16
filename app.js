import express from 'express';

const PORT = 3006;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

function get_root(req, res) {
    return res.render('index');
}

function get_add_job(req, res) {
    
}

function save_job(req, res) {

}

function get_confirm(req, res) {

}

app.get('/', get_root);
app.get('/add_job', get_add_job);
app.get('/confirm', get_confirm);
app.post('/submit-job', save_job);

app.listen(PORT, () => {console.log("Server started")});