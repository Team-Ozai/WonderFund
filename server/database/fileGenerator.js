const faker = require('faker');
const path = require('path');
const fs = require('fs');


const writeRNC = fs.createWriteStream(__dirname + '/rnc.csv');
writeRNC.write('title1, title2, title3, title4, title5, text1, text2, text3, text4, text5\n', 'utf8');
const writeEC = fs.createWriteStream(__dirname + '/ec.csv');
writeEC.write('title1, title2, title3, title4, title5, text1, text2, text3, text4, text5\n', 'utf8');
const writeStory = fs.createWriteStream(__dirname + '/story.csv');
writeStory.write('gif1, gif2, gif3, img1, img2, img3, title1, title2, title3, title4, title5, text1, text2, text3, text4, text5\n', 'utf8');
console.log(__dirname);
// //API Call for gifs
// gifAPICall = function (offSetAmount) {
//   var api = "http://api.giphy.com/v1/gifs/search?";
//   var limit = "&limit=25";
//   var query = "&q=basketball";
//   var rating = "&rating=g";
//   var apiKey = "&api_key=dc6zaTOxFJmzC";
//   var offSet = "&offset=" + offSetAmount;
//   var apiUrl = api + limit + query + rating + apiKey + offSet;

//   return new Promise(function (resolve, reject) {
//     axios({
//       method: 'get',
//       url: apiUrl.toString(),
//     })
//       .then(function (response) {
//         let results = [];
//         let dataSet;
//         let saveUrl = '';
//         for (let i = 0; i < response.data.data.length; i++) {
//           dataSet = response.data.data[i];
//           saveUrl = "http://i." + dataSet.images.original.webp.slice(15)
//           results.push(saveUrl)
//         }
//         resolve(results)
//       });
//   });
// }

// //Recursive function to get 100 gifs
// const getGif = function (offset = 0, result = []) {
//   return gifAPICall(offset)
//     .then(function (data) {
//       result = result.concat(data)
//       if (result.length < 100) {
//         return getGif(offset + 25, result)
//       } else {
//         return result
//       }
//     })
// }


function writeRNCData(writer, encoding, callback) {
  let i = 10000000;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const title1 = faker.lorem.words();
      const title2 = faker.lorem.words();
      const title3 = faker.lorem.words();
      const title4 = faker.lorem.words();
      const title5 = faker.lorem.words();
      const text1 = faker.lorem.paragraph();
      const text2 = faker.lorem.paragraph();
      const text3 = faker.lorem.paragraph();
      const text4 = faker.lorem.paragraph();
      const text5 = faker.lorem.paragraph();
      const data = `${title1},${title2},${title3},${title4},${title5},${text1},${text2},${text3},${text4},${text5}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write()
}

function writeECData(writer, encoding, callback) {
  let i = 10000000;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const title1 = faker.lorem.words();
      const title2 = faker.lorem.words();
      const title3 = faker.lorem.words();
      const title4 = faker.lorem.words();
      const title5 = faker.lorem.words();
      const text1 = faker.lorem.paragraph();
      const text2 = faker.lorem.paragraph();
      const text3 = faker.lorem.paragraph();
      const text4 = faker.lorem.paragraph();
      const text5 = faker.lorem.paragraph();
      const data = `${title1},${title2},${title3},${title4},${title5},${text1},${text2},${text3},${text4},${text5}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write()
}

const writeStoryData = async (writer, encoding, callback) => {
  let i = 10000000;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const gif1 = `http://sdcproject.s3.ap-northeast-2.amazonaws.com/gifs/${Math.floor(Math.random() * 100) + 1}.webp`;
      const gif2 = `http://sdcproject.s3.ap-northeast-2.amazonaws.com/gifs/${Math.floor(Math.random() * 100) + 1}.webp`;
      const gif3 = `http://sdcproject.s3.ap-northeast-2.amazonaws.com/gifs/${Math.floor(Math.random() * 100) + 1}.webp`;
      const img1 = `http://sdcproject.s3.ap-northeast-2.amazonaws.com/imgs/${Math.floor(Math.random() * 20) + 1}.jpeg`;
      const img2 = `http://sdcproject.s3.ap-northeast-2.amazonaws.com/imgs/${Math.floor(Math.random() * 20) + 1}.jpeg`;
      const img3 = `http://sdcproject.s3.ap-northeast-2.amazonaws.com/imgs/${Math.floor(Math.random() * 20) + 1}.jpeg`;
      const title1 = faker.lorem.words();
      const title2 = faker.lorem.words();
      const title3 = faker.lorem.words();
      const title4 = faker.lorem.words();
      const title5 = faker.lorem.words();
      const text1 = faker.lorem.paragraph();
      const text2 = faker.lorem.paragraph();
      const text3 = faker.lorem.paragraph();
      const text4 = faker.lorem.paragraph();
      const text5 = faker.lorem.paragraph();
      const data = `${gif1},${gif2},${gif3},${img1},${img2},${img3},${title1},${title2},${title3},${title4},${title5},${text1},${text2},${text3},${text4},${text5}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write()
}

//Generate Data for 3 tables - Story, RisksAndChallenges, and  EnvironmentalCommitments
const getData = function () {

  writeRNCData(writeRNC, 'utf-8', () => {
    writeRNC.end();
  });
  writeECData(writeEC, 'utf-8', () => {
    writeEC.end();
  });
  writeStoryData(writeStory, 'utf-8', () => {
    writeStory.end();
  });
}

getData()
