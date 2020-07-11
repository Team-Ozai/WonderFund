const express = require('express')
const morgan = require('morgan')
const db = require('./model/database.js')
const controller = require('./controller/controller.js')
const path = require('path');
const cors = require('cors')

const app = express()
const port = 3003

app.use(express.json())
app.use(morgan('tiny'));
app.use(cors());

app.use(express.static(__dirname + '/../client/dist'));

// Get Requests
app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.get('/api/story/:id', function (req, res) {
  controller.getStoryFromID(req.params.id)
    .then(function (data) {
      res.status(200).send(data);
    })
});

app.get('/api/story/', function (req, res) {
  controller.getStoryFromID(0)
    .then(function (data) {
      res.status(200).send(data);
    })
});

app.get('/api/risksandchallenges/:id', function (req, res) {
  controller.getRisksAndChallengesFromID(req.params.id)
    .then(function (data) {
      res.status(200).send(data);
    })
});

app.get('/api/risksandchallenges/', function (req, res) {
  controller.getRisksAndChallengesFromID(0)
    .then(function (data) {
      res.status(200).send(data);
    })
});

app.get('/api/environmentalcommitments/:id', function (req, res) {
  controller.getEnvironmentalCommitmentsFromID(req.params.id)
    .then(function (data) {
      res.status(200).send(data);
    })
});


// Post Requests
app.post('/api/story', function (req, res) {
  var data = req.body;
  controller.addStory(data)
    .then(function (data) {
      res.status(200).send(data);
    })
});

app.post('/api/risksandchallenges', function (req, res) {
  var data = req.body;
  controller.addRisksAndChallenges(data)
    .then(function (data) {
      res.status(200).send(data);
    })
});

app.post('/api/environmentalcommitments', function (req, res) {
  var data = req.body;
  controller.addEnvironmentalCommitments(data)
    .then(function (data) {
      res.status(200).send(data);
    })
});

// Patch Requests
app.patch('/api/story/:id', function (req, res) {
  var data = req.body;
  var id = req.params.id;
  controller.updateStoryById(id, data)
    .then(function (data) {
      res.status(200).send(data);
    })
});

app.patch('/api/risksandchallenges/:id', function (req, res) {
  var data = req.body;
  var id = req.params.id;
  controller.updateRisksAndChallengesById(id, data)
    .then(function (data) {
      res.status(200).send(data);
    })
});

app.patch('/api/environmentalcommitments/:id', function (req, res) {
  var data = req.body;
  var id = req.params.id;
  controller.updateEnvironmentalCommitmentsById(id, data)
    .then(function (data) {
      res.status(200).send(data);
    })
});

// Delete Requests
app.delete('/api/story/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  controller.deleteStoryById(id)
    .then(function (data) {
      res.status(200).send(data);
    })
});

app.delete('/api/risksandchallenges/:id', function (req, res) {
  var id = req.params.id;
  controller.deleteRisksAndChallengesById(id)
    .then(function (data) {
      res.status(200).send(data);
    })
});

app.delete('/api/environmentalcommitments/:id', function (req, res) {
  var id = req.params.id;
  controller.deleteEnvironmentalCommitmentsById(id)
    .then(function (data) {
      res.status(200).send(data);
    })
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})