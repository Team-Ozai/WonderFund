const faker = require('faker');
const axios = require('axios');
const db = require('./database.js');
const csv = require('fast-csv');
const path = require('path');
const fs = require('fs');
const { Pool, Client } = require('pg')
// const connectionString = 'postgresql://root:root@localhost:5432/campaign'
const client = new Pool({
  user: "root",
  host: "localhost",
  database: "campaign",
  password: "root",
  port: "5432"
});

//API Call for gifs
gifAPICall = function (offSetAmount) {
  var api = "http://api.giphy.com/v1/gifs/search?";
  var limit = "&limit=25";
  var query = "&q=basketball";
  var rating = "&rating=g";
  var apiKey = "&api_key=dc6zaTOxFJmzC";
  var offSet = "&offset=" + offSetAmount;
  var apiUrl = api + limit + query + rating + apiKey + offSet;

  return new Promise(function (resolve, reject) {
    axios({
      method: 'get',
      url: apiUrl.toString(),
    })
      .then(function (response) {
        let results = [];
        let dataSet;
        let saveUrl = '';
        for (let i = 0; i < response.data.data.length; i++) {
          dataSet = response.data.data[i];
          saveUrl = "http://i." + dataSet.images.original.webp.slice(15)
          results.push(saveUrl)
        }
        resolve(results)
      });
  });
}

//Recursive function to get 100 gifs
const getGif = function (offset = 0, result = []) {
  return gifAPICall(offset)
    .then(function (data) {
      result = result.concat(data)
      if (result.length < 100) {
        return getGif(offset + 25, result)
      } else {
        return result
      }
    })
}



const RNC = async (connect) => {
  var ws = fs.createWriteStream("rnc.csv");
  var csvStream = csv.format({ headers: true });
  csvStream.pipe(ws);
  var rncPath = path.join(__dirname, 'rnc.csv')

  for (var i = 0; i < 10000000; i++) {
    await csvStream.write({
      title1: faker.lorem.words(),
      title2: faker.lorem.words(),
      title3: faker.lorem.words(),
      title4: faker.lorem.words(),
      title5: faker.lorem.words(),
      text1: faker.lorem.paragraph(),
      text2: faker.lorem.paragraph(),
      text3: faker.lorem.paragraph(),
      text4: faker.lorem.paragraph(),
      text5: faker.lorem.paragraph()
    })
  }

  csvStream.end();

}
// connect.query(`COPY "RisksAndChallenges"(title1, title2, title3, title4, title5, text1, text2, text3, text4, text5) FROM '${rncPath}' DELIMITER ',' CSV HEADER`);

const Story = async (connect) => {
  var gifData = await getGif();
  var ws = fs.createWriteStream("story.csv");
  var csvStream = csv.format({ headers: true });
  csvStream.pipe(ws);
  var storyPath = path.join(__dirname, 'story.csv')


  for (var i = 0; i < 10000000; i++) {
    await csvStream.write({
      gif1: gifData[Math.floor(Math.random() * 99) + 0],
      gif2: gifData[Math.floor(Math.random() * 99) + 0],
      gif3: gifData[Math.floor(Math.random() * 99) + 0],
      img1: faker.image.sports(),
      img2: faker.image.sports(),
      img3: faker.image.sports(),
      title1: faker.lorem.words(),
      title2: faker.lorem.words(),
      title3: faker.lorem.words(),
      title4: faker.lorem.words(),
      title5: faker.lorem.words(),
      text1: faker.lorem.paragraph(),
      text2: faker.lorem.paragraph(),
      text3: faker.lorem.paragraph(),
      text4: faker.lorem.paragraph(),
      text5: faker.lorem.paragraph()
    })
  }
  csvStream.end();

}

//   async function query() {
//     console.log('before');
//   await writeFile();
//   console.log('after1');
//   setTimeout(()=>connect.query(`COPY "Story"(gif1, gif2, gif3, img1, img2, img3, title1, title2, title3, title4, title5, text1, text2, text3, text4, text5) FROM '${storyPath}' DELIMITER ',' CSV HEADER`),5000);
//   console.log('after2');

// }
// query();
const EC = async (connect) => {
  var ws = fs.createWriteStream("ec.csv");
  var csvStream = csv.format({ headers: true });
  csvStream.pipe(ws);
  var ecPath = path.join(__dirname, 'ec.csv')

  for (var i = 0; i < 10000000; i++) {
    csvStream.write({
      title1: faker.lorem.words(),
      title2: faker.lorem.words(),
      title3: faker.lorem.words(),
      title4: faker.lorem.words(),
      title5: faker.lorem.words(),
      text1: faker.lorem.paragraph(),
      text2: faker.lorem.paragraph(),
      text3: faker.lorem.paragraph(),
      text4: faker.lorem.paragraph(),
      text5: faker.lorem.paragraph()
    })
  }

  csvStream.end();

}
// connect.query(`COPY "EnvironmentalCommitments"(title1, title2, title3, title4, title5, text1, text2, text3, text4, text5) FROM '${ecPath}' DELIMITER ',' CSV HEADER`)
// const addStories = async (gifData, connect) => {

//   var start = Date.now();
//   for (var i = 0; i < 1000; i++) {
//     await connect.models.Story.create({
//       gif1: gifData[Math.floor(Math.random() * 99) + 0],
//       gif2: gifData[Math.floor(Math.random() * 99) + 0],
//       gif3: gifData[Math.floor(Math.random() * 99) + 0],
//       img1: faker.image.sports(),
//       img2: faker.image.sports(),
//       img3: faker.image.sports(),
//       title1: faker.lorem.words(),
//       title2: faker.lorem.words(),
//       title3: faker.lorem.words(),
//       title4: faker.lorem.words(),
//       title5: faker.lorem.words(),
//       text1: faker.lorem.paragraph(),
//       text2: faker.lorem.paragraph(),
//       text3: faker.lorem.paragraph(),
//       text4: faker.lorem.paragraph(),
//       text5: faker.lorem.paragraph()
//     })
//       .then(function (data) {
//       })
//       .catch(function (err) {
//       })
//   }
//   var end = Date.now();
//   console.log(`Story Execution time: ${end - start} ms`);
// }


// const addRisksAndChallenges = async (connect) => {
//   var start = Date.now();
//   for (var i = 0; i < 10000000; i++) {
//     await connect.models.RisksAndChallenges.create({
//       title1: faker.lorem.words(),
//       title2: faker.lorem.words(),
//       title3: faker.lorem.words(),
//       title4: faker.lorem.words(),
//       title5: faker.lorem.words(),
//       text1: faker.lorem.paragraph(),
//       text2: faker.lorem.paragraph(),
//       text3: faker.lorem.paragraph(),
//       text4: faker.lorem.paragraph(),
//       text5: faker.lorem.paragraph()
//     })
//       .then(function (data) {
//       })
//       .catch(function (err) {
//       })
//   }
//   var end = Date.now();
//   console.log(`RisksAndChallenge Execution time: ${end - start} ms`);
// }


// const addEnvironmentalCommitments = async (connect) => {
//   var start = Date.now();
//   for (var i = 0; i < 10000000; i++) {
//     await connect.models.EnvironmentalCommitments.create({
//       title1: faker.lorem.words(),
//       title2: faker.lorem.words(),
//       title3: faker.lorem.words(),
//       title4: faker.lorem.words(),
//       title5: faker.lorem.words(),
//       text1: faker.lorem.paragraph(),
//       text2: faker.lorem.paragraph(),
//       text3: faker.lorem.paragraph(),
//       text4: faker.lorem.paragraph(),
//       text5: faker.lorem.paragraph()
//     })
//       .then(function (data) {
//       })
//       .catch(function (err) {
//       })
//   }
//   var end = Date.now();
//   console.log(`EnvironmentalCommitments Execution time: ${end - start} ms`);
// }


//Seed 3 tables - Story, RisksAndChallenges, and  EnvironmentalCommitments
const getData = async function () {
  var connect = await db.pgConnection();
  // var addRisksAndChallengesEntries = await addRisksAndChallenges(connect);
  // var addEnvironmentalCommitmentsEntries = await addEnvironmentalCommitments(connect);
  // var addStoryEntries = await addStories(gifData, connect);
  Story(connect);
  RNC(connect);
  EC(connect);
  // var closeConnection = await connect.close()
  // var complete = await finish(connect);
  //  var closeProcess = await process.exit(0);

}

getData()
