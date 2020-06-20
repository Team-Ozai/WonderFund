const faker = require('faker');
const axios = require('axios');
const db = require('./database.js');

//API Call for gifs
gifAPICall = function(offSetAmount){
  var api = "http://api.giphy.com/v1/gifs/search?";
  var limit = "&limit=25";
  var query  = "&q=business";
  var rating = "&rating=g";
  var apiKey = "&api_key=dc6zaTOxFJmzC";
  var offSet = "&offset=" + offSetAmount;
  var apiUrl =  api + limit + query + rating + apiKey + offSet;

 return new Promise(function(resolve, reject){
  axios({
      method: 'get',
      url: apiUrl.toString(),
    })
      .then(function (response) {
        let results = [];
        let dataSet;
        let saveUrl = '';
        for (let i = 0; i < response.data.data.length; i++){
          dataSet = response.data.data[i];
          saveUrl = "http://i." + dataSet.images.original.webp.slice(15)
          results.push(saveUrl)
        }
        resolve(results)
    });
  });
}

//Recursive function to get 100 gifs
const getGif = function(offset = 0, result=[]){
 return gifAPICall( offset )
    .then(function(data){
      result = result.concat(data)
      if (result.length < 100){
        return getGif(offset + 25, result)
      }else {
        return result
      }
    })
}

//Seed 3 tables - Story, RiskAndChallenges, and  EnvironmentalCommitments
Promise.resolve("done")
  .then(function(){
    return getGif()
  })
  .then(function(data){
    for ( let i = 0; i < data.length; i++){
      db.Story.create({ title: faker.lorem.words(),
                        gif: data[i],
                        text:faker.lorem.paragraph()
                      })
        .then(function(data){
        })
        .catch(function(err){
        })
    }
  })
  .then(function(data){
    for (let i = 0; i < 100; i++){
      db.RiskAndChallenges.create({
        title: faker.lorem.words(),
        text:faker.lorem.paragraph()
      })
      .then(function(data){
      })
      .catch(function(err){
      })
    }
  })
  .then(function(data){
    for (let i = 0; i < 100; i++){
      db.EnvironmentalCommitments.create({
        title: faker.lorem.words(),
        text:faker.lorem.paragraph()
      })
      .then(function(data){
      })
      .catch(function(err){
      })
    }
  })