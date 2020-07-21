var newrelic = require('newrelic');
const express = require('express')
const morgan = require('morgan')
const path = require('path');
const cors = require('cors');
const { Pool, Client } = require('pg');

const app = express()
const port = 3003

app.use(express.json())
app.use(morgan('tiny'));
app.use(cors());

app.use(express.static(__dirname + '/../client/dist'));
var dbName = 'campaign',
  username = 'root',
  password = 'root',
  host = 'postgres',
  dbport = ':5432'

var conStringPost = 'postgres://' + username + ':' + password + '@' + host + dbport + '/' + dbName;

// connect to postgres db
const pool = new Pool({ connectionString: conStringPost })
// Get Requests
app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.get('/api/story/:id', function (req, res) {
  var value = req.params.id
  pool.query(`select * from "Story" where id= ${value}`, (err, data) => {
    res.send(data.rows[0]);
  })
});

app.get('/api/story/', function (req, res) {
  pool.query('select * from "Story" where id= 1', (err, data) => {
    res.send(data.rows[0]);
  })
});

app.get('/api/risksandchallenges/:id', function (req, res) {
  var value = req.params.id
  pool.query(`select * from "RisksAndChallenges" where id= ${value}`, (err, data) => {
    res.send(data.rows[0]);
  })
});

app.get('/api/risksandchallenges/', function (req, res) {
  pool.query('select * from "RisksAndChallenges" where id= 1', (err, data) => {
    res.send(data.rows[0]);
  })
});

app.get('/api/environmentalcommitments/:id', function (req, res) {
  var value = req.params.id
  pool.query(`select * from "EnvironmentalCommitments" where id= ${value}`, (err, data) => {
    res.send(data.rows[0]);
  })
});

app.get('/api/environmentalcommitments/', function (req, res) {
  pool.query('select * from "EnvironmentalCommitments" where id= 1', (err, data) => {
    res.send(data.rows[0]);
  })
});

// Post Requests
app.post('/api/story', function (req, res) {
  var data = req.body;
  pool.query(`insert into "Story"(gif1, gif2, gif3, img1, img2, img3, title1, title2, title3, title4, title5, text1, text2, text3, text4, text5) values ('${data.gif1}', '${data.gif2}', '${data.gif3}', '${data.img1}', '${data.img2}', '${data.img3}', '${data.title1}', '${data.title2}', '${data.title3}', '${data.title4}', '${data.title5}', '${data.text1}', '${data.text2}', '${data.text3}', '${data.text4}', '${data.text5}')`, (err, data) => {
    res.send(data);
  })
});

app.post('/api/risksandchallenges', function (req, res) {
  var data = req.body;
  pool.query(`insert into "RisksAndChallenges"(title1, title2, title3, title4, title5, text1, text2, text3, text4, text5) values ('${data.title1}', '${data.title2}', '${data.title3}', '${data.title4}', '${data.title5}', '${data.text1}', '${data.text2}', '${data.text3}', '${data.text4}', '${data.text5}')`, (err, data) => {
    res.send(data);
  })
});

app.post('/api/environmentalcommitments', function (req, res) {
  var data = req.body;
  pool.query(`insert into "EnvironmentalCommitments"(title1, title2, title3, title4, title5, text1, text2, text3, text4, text5) values ('${data.title1}', '${data.title2}', '${data.title3}', '${data.title4}', '${data.title5}', '${data.text1}', '${data.text2}', '${data.text3}', '${data.text4}', '${data.text5}')`, (err, data) => {
    res.send(data);
  })
});

// Patch Requests
app.patch('/api/story/:id', function (req, res) {
  var data = req.body;
  var id = req.params.id;
  pool.query(`update "Story" set gif1='${data.gif1}', gif2='${data.gif2}', gif3='${data.gif3}', img1='${data.img1}', img2='${data.img2}', img3='${data.img3}', title1='${data.title1}', title2='${data.title2}', title3='${data.title3}', title4='${data.title4}', title5='${data.title5}', text1='${data.text1}', text2='${data.text2}', text3='${data.text3}', text4='${data.text4}', text5='${data.text5}' where id=${id}`, (err, data) => {
    res.send(data);
  })
});

app.patch('/api/risksandchallenges/:id', function (req, res) {
  var data = req.body;
  var id = req.params.id;
  pool.query(`update "RisksAndChallenges" set title1='${data.title1}', title2='${data.title2}', title3='${data.title3}', title4='${data.title4}', title5='${data.title5}', text1='${data.text1}', text2='${data.text2}', text3='${data.text3}', text4='${data.text4}', text5='${data.text5}' where id=${id}`, (err, data) => {
    res.send(data);
  })
});

app.patch('/api/environmentalcommitments/:id', function (req, res) {
  var data = req.body;
  var id = req.params.id;
  pool.query(`update "EnvironmentalCommitments" set title1='${data.title1}', title2='${data.title2}', title3='${data.title3}', title4='${data.title4}', title5='${data.title5}', text1='${data.text1}', text2='${data.text2}', text3='${data.text3}', text4='${data.text4}', text5='${data.text5}' where id=${id}`, (err, data) => {
    res.send(data);
  })
});

// Delete Requests
app.delete('/api/story/:id', function (req, res) {
  var id = req.params.id;
  pool.query(`delete from "Story" where id=${id}`, (err, data) => {
    res.send(data);
  })
});

app.delete('/api/risksandchallenges/:id', function (req, res) {
  var id = req.params.id;
  pool.query(`delete from "RisksAndChallenges" where id=${id}`, (err, data) => {
    res.send(data);
  })
});

app.delete('/api/environmentalcommitments/:id', function (req, res) {
  var id = req.params.id;
  pool.query(`delete from "EnvironmentalCommitments" where id=${id}`, (err, data) => {
    res.send(data);
  })
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})