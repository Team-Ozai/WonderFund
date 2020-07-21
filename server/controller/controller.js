const db = require('../model/database.js');
const { Pool, Client } = require('pg');

var dbName = 'campaign',
  username = 'root',
  password = 'root',
  host = 'postgres',
  port = ':5432'

var conStringPost = 'postgres://' + username + ':' + password + '@' + host + port + '/' + dbName;

// connect to postgres db
const pool = new Pool({ connectionString: conStringPost })

const getStoryFromID = async function (value) {
  const connect = await db.Connection();
  return connect.models.RisksAndChallenges.findOne({ where: { id: value } })
    .then(async function (data) {
      await connect.close()
      return data.dataValues
    })
    .catch(async function (err) {
      await connect.close()
      return err
    })
};

const getRisksAndChallengesFromID = async function (value) {
  const connect = await db.Connection();
  return connect.models.RisksAndChallenges.findOne({ where: { id: value } })
    .then(async function (data) {
      await connect.close()
      return data.dataValues
    })
    .catch(async function (err) {
      await connect.close()
      return err
    })
}

const getEnvironmentalCommitmentsFromID = async function (value) {
  const connect = await db.Connection();
  return connect.models.EnvironmentalCommitments.findOne({ where: { id: value } })
    .then(async function (data) {
      await connect.close()
      return data.dataValues
    })
    .catch(async function (err) {
      await connect.close()
      return err
    })
}

// add data
const addStory = async function (storyData) {
  const connect = await db.Connection();
  return new Promise((resolve, reject) => {
    connect.models.Story.create(storyData)
      .then(function (data) {
      })
      .catch(function (err) {
      })

    resolve("done")
  })
}

const addRisksAndChallenges = async function (RCData) {
  const connect = await db.Connection();
  return new Promise((resolve, reject) => {
    connect.models.RisksAndChallenges.create(RCData)
      .then(function (data) {
      })
      .catch(function (err) {
      })

    resolve("done")
  })
}

const addEnvironmentalCommitments = async function (ECData) {
  const connect = await db.Connection();
  return new Promise((resolve, reject) => {
    connect.models.EnvironmentalCommitments.create(ECData)
      .then(function (data) {
      })
      .catch(function (err) {
      })

    resolve("done")
  })
}

// delete data
const deleteStoryById = async function (storyId) {
  const connect = await db.Connection();
  return connect.models.Story.destroy({ where: { id: storyId } })
    .then(async function (data) {
      await connect.close()
      return data.dataValues
    })
    .catch(async function (err) {
      await connect.close()
      return err
    })
}

const deleteRisksAndChallengesById = async function (RCId) {
  const connect = await db.Connection();
  return connect.models.RisksAndChallenges.destroy({ where: { id: RCId } })
    .then(async function (data) {
      await connect.close()
      return data.dataValues
    })
    .catch(async function (err) {
      await connect.close()
      return err
    })
}

const deleteEnvironmentalCommitmentsById = async function (ECId) {
  const connect = await db.Connection();
  return connect.models.EnvironmentalCommitments.destroy({ where: { id: ECId } })
    .then(async function (data) {
      await connect.close()
      return data.dataValues
    })
    .catch(async function (err) {
      await connect.close()
      return err
    })

}

// update data
const updateStoryById = async function (storyId, data) {
  const connect = await db.Connection();
  return connect.models.Story.update(data, { where: { id: storyId } })
    .then(async function (data) {
      await connect.close()
      return data.dataValues
    })
    .catch(async function (err) {
      await connect.close()
      return err
    })
}

const updateRisksAndChallengesById = async function (RCId, data) {
  const connect = await db.Connection();
  return connect.models.RisksAndChallenges.update(data, { where: { id: RCId } })
    .then(async function (data) {
      await connect.close()
      return data.dataValues
    })
    .catch(async function (err) {
      await connect.close()
      return err
    })
}

const updateEnvironmentalCommitmentsById = async function (ECId, data) {
  const connect = await db.Connection();
  return connect.models.EnvironmentalCommitments.update(data, { where: { id: ECId } })
    .then(async function (data) {
      await connect.close()
      return data.dataValues
    })
    .catch(async function (err) {
      await connect.close()
      return err
    })

}


module.exports.getStoryFromID = getStoryFromID;
module.exports.getRisksAndChallengesFromID = getRisksAndChallengesFromID;
module.exports.getEnvironmentalCommitmentsFromID = getEnvironmentalCommitmentsFromID;
module.exports.addStory = addStory;
module.exports.addRisksAndChallenges = addRisksAndChallenges;
module.exports.addEnvironmentalCommitments = addEnvironmentalCommitments;
module.exports.deleteStoryById = deleteStoryById;
module.exports.deleteRisksAndChallengesById = deleteRisksAndChallengesById;
module.exports.deleteEnvironmentalCommitmentsById = deleteEnvironmentalCommitmentsById;
module.exports.updateStoryById = updateStoryById;
module.exports.updateRisksAndChallengesById = updateRisksAndChallengesById;
module.exports.updateEnvironmentalCommitmentsById = updateEnvironmentalCommitmentsById;