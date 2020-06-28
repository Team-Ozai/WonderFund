const db = require('../model/database.js')

const getStoryFromID = async function(value){
  try{
    const connect = await db.Connection();
    return connect.models.Story.findOne({ where: {id: value }})
      .then(function(data){
        return data.dataValues
      })
      .catch(function(err){
        return err
      })
  } catch(error){
    return error
  }
};

const getRisksAndChallengesFromID = async function(value){
  const connect = await db.Connection();
  return connect.models.RisksAndChallenges.findOne({ where: {id: value }})
  .then(function(data){
    return data.dataValues
  })
  .catch(function(err){
    return err
  })
}

const getEnvironmentalCommitmentsFromID = async function(value){
  const connect = await db.Connection();
  return connect.models.EnvironmentalCommitments.findOne({ where: {id: value }})
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