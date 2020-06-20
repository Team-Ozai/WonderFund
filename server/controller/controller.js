const db = require('../model/database.js')

getStoryFromID = function(value){
  return db.Story.findOne({ where: {id: value }})
    .then(function(data){
      return data.dataValues
    })
    .catch(function(err){
      return err
    })
};

getRisksAndChallengesFromID = function(value){
  return db.RiskAndChallenges.findOne({ where: {id: value }})
  .then(function(data){
    return data.dataValues
  })
  .catch(function(err){
    return err
  })
}

getEnvironmentalCommitmentsFromID = function(value){
  return db.EnvironmentalCommitments.findOne({ where: {id: value }})
  .then(function(data){
    return data.dataValues
  })
  .catch(function(err){
    return err
  })
}

module.exports.getStoryFromID = getStoryFromID;
module.exports.getRisksAndChallengesFromID = getRisksAndChallengesFromID;
module.exports.getEnvironmentalCommitmentsFromID = getEnvironmentalCommitmentsFromID;