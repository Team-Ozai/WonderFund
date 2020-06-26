const express = require('express')
const morgan = require('morgan')
const db = require('./model/database.js')
const controller = require('./controller/controller.js')
const path = require('path');

const app = express()
const port = 3003

// app.use(express.static('../client/dist'))
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json())
app.use(morgan('tiny'));

app.get('/api/story/:id', function (req, res){
  controller.getStoryFromID(req.params.id)
  .then(function(data){
    res.status(200).send(data);
  })
});

app.get('/api/risksandchallenges/:id', function (req, res){
  controller.getRisksAndChallengesFromID(req.params.id)
  .then(function(data){
    res.status(200).send(data);
  })
});

app.get('/api/environmentalcommitments/:id', function (req, res){
  controller.getEnvironmentalCommitmentsFromID(req.params.id)
  .then(function(data){
    res.status(200).send(data);
  })
});

app.listen(port, () =>{
  console.log(`listening at http://localhost:${port}`)
})