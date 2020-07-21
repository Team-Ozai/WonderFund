const { Pool, Client } = require('pg');
const path = require('path');
// const db = require('./database.js');
const Setup = require('./pgsetup.js').Setup;

const client = new Pool({
  user: "root",
  host: "postgres",
  database: "campaign",
  password: "root",
  port: "5432"
});

var storyPath = path.join(__dirname, 'story.csv');
var rncPath = path.join(__dirname, 'rnc.csv');
var ecPath = path.join(__dirname, 'ec.csv');

const seed = async () => {
  await Setup();
  console.log(storyPath);
  console.log(rncPath);
  console.log(ecPath);
  client.query(`COPY "Story"(gif1, gif2, gif3, img1, img2, img3, title1, title2, title3, title4, title5, text1, text2, text3, text4, text5) FROM '${storyPath}' DELIMITER ',' CSV HEADER`);
  client.query(`COPY "RisksAndChallenges"(title1, title2, title3, title4, title5, text1, text2, text3, text4, text5) FROM '${rncPath}' DELIMITER ',' CSV HEADER`);
  client.query(`COPY "EnvironmentalCommitments"(title1, title2, title3, title4, title5, text1, text2, text3, text4, text5) FROM '${ecPath}' DELIMITER ',' CSV HEADER`);
};

seed();
