const faker = require('faker');
const axios = require('axios');
const db = require('./database.js');

//API Call for gifs
gifAPICall = function(offSetAmount){
  var api = "http://api.giphy.com/v1/gifs/search?";
  var limit = "&limit=25";
  var query  = "&q=bed";
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

const addStories = function(gifData, connect){
  return new Promise((resolve, reject)=>{
    for ( let i = 0; i < gifData.length; i++){
      connect.models.Story.create({
        title: faker.lorem.words(),
        gif: gifData[i],
        text:faker.lorem.paragraph()
      })
      .then(function(data){
      })
      .catch(function(err){
      })
    }
    resolve("done")
  })
}

const addRisksAndChallenges = function(connect){
  return new Promise((resolve, reject)=>{
    for (let i = 0; i < 100; i++){
      connect.models.RisksAndChallenges.create({
        title: faker.lorem.words(),
        text:faker.lorem.paragraph()
      })
      .then(function(data){
      })
      .catch(function(err){
      })
    }
    resolve("done")
  })
}

const addEnvironmentalCommitments = function(connect){
  return new Promise((resolve, reject)=>{
    for ( let i = 0; i < 100; i++){
      connect.models.EnvironmentalCommitments.create({
        title: faker.lorem.words(),
        text:faker.lorem.paragraph()
      })
      .then(function(data){
      })
      .catch(function(err){
      })
    }
    resolve("done");
  })
}

//Seed 3 tables - Story, RisksAndChallenges, and  EnvironmentalCommitments
async function getData(){
  var gifData = await getGif();
  const connect = await db.Connection();
  var addRisksAndChallengesEntries = await addRisksAndChallenges(connect);
  var addEnvironmentalCommitmentsEntries = await addEnvironmentalCommitments(connect);
  var addStoryEntries = await addStories(gifData, connect);
}

getData()
