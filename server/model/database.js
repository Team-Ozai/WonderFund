const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('campaign', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

class Story extends Model {}
class RiskAndChallenges extends Model {}
class EnvironmentalCommitments extends Model {}

Story.init({
  title: {
    type: DataTypes.TEXT
  },
  gif: {
    type: DataTypes.TEXT
  },
  text: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'Story',
  freezeTableName: true,
});

RiskAndChallenges.init({
  title: {
    type: DataTypes.TEXT
  },
  text: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'RiskAndChallenges',
  freezeTableName: true,
});

EnvironmentalCommitments.init({
  title: {
    type: DataTypes.TEXT
  },
  text: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'EnvironmentalCommitments',
  freezeTableName: true,
});

Story.sync()
RiskAndChallenges.sync()
EnvironmentalCommitments.sync()

module.exports.Story = Story;
module.exports.RiskAndChallenges = RiskAndChallenges;
module.exports.EnvironmentalCommitments = EnvironmentalCommitments;