var newrelic = require('newrelic');
const cluster = require('cluster');
const redis = require('redis');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const { Pool, Client } = require('pg');
const dbConfig = require('./config/db-config.json');
const port = 3003
const redisPort = 6379;
const redisClient = redis.createClient(redisPort);
var conStringPost = 'postgres://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.host + '/' + dbConfig.dbName;

// connect to postgres db
const pool = new Pool({ connectionString: conStringPost })

if (cluster.isMaster) {

  var cpuCount = require('os').cpus().length;

  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  // Listen for dying workers
  cluster.on('exit', function (worker) {


    console.log(`Worker ${worker.id} died`);
    cluster.fork();

  });
} else {

  const express = require('express')
  const app = express()

  app.use(express.json())
  app.use(morgan('tiny'));
  app.use(cors());

  app.use(express.static(__dirname + '/../client/dist'));
  app.use('/:id', express.static(__dirname + '/../client/dist'));


  // // Get Requests
  // app.get('/:id', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  // });

  // Cache middleware
  const cache = function (req, res, next) {
    var redisKey = `${req.url.split('/')[2]}:${req.params.id}`
    console.log(redisKey);

    redisClient.get(redisKey, (err, data) => {
      if (err) throw err;

      if (data !== null) {
        res.send(JSON.parse(data));
      } else {
        next();
      }
    });
  }

  // Get Requests
  app.get('/api/story/:id', cache, function (req, res) {
    var value = req.params.id
    var storyRedisKey = 'story:' + value;
    pool.query(`select * from "Story" where id= ${value}`, (err, data) => {
      var result = data.rows[0]
      redisClient.setex(storyRedisKey, 3600, JSON.stringify(result));
      // console.log(data);
      res.send(data.rows[0]);
    })
  });

  app.get('/api/risksandchallenges/:id', cache, function (req, res) {
    var value = req.params.id
    var rncRedisKey = 'risksandchallenges:' + value;
    pool.query(`select * from "RisksAndChallenges" where id= ${value}`, (err, data) => {
      var result = data.rows[0]
      redisClient.setex(rncRedisKey, 3600, JSON.stringify(result));
      res.send(data.rows[0]);
    })
  });

  app.get('/api/environmentalcommitments/:id', cache, function (req, res) {
    var value = req.params.id;
    var ecRedisKey = 'environmentalcommitments:' + value;
    pool.query(`select * from "EnvironmentalCommitments" where id= ${value}`, (err, data) => {
      var result = data.rows[0]
      redisClient.setex(ecRedisKey, 3600, JSON.stringify(result));
      res.send(data.rows[0]);
    })
  });

  // app.get('/api/story/', cache, function (req, res) {
  //   var storyRedisKey = 'story:1';
  //   pool.query('select * from "Story" where id= 1', (err, data) => {
  //     var result = data.rows[0]
  //     redisClient.setex(storyRedisKey, 3600, JSON.stringify(result));
  //     res.send(data.rows[0]);
  //   })
  // });

  // app.get('/api/risksandchallenges/', cache, function (req, res) {
  //   var rncRedisKey = 'rnc:1';
  //   pool.query('select * from "RisksAndChallenges" where id= 1', (err, data) => {
  //     var result = data.rows[0]
  //     redisClient.setex(rncRedisKey, 3600, JSON.stringify(result));
  //     res.send(data.rows[0]);
  //   })
  // });

  // app.get('/api/environmentalcommitments/', function (req, res) {
  //   pool.query('select * from "EnvironmentalCommitments" where id= 1', (err, data) => {
  //     res.send(data.rows[0]);
  //   })
  // });

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
    console.log(`listening at http://localhost:${port} and worker ${cluster.worker.id} running`)
  })
}