// const {Pool, Client} = require('pg');
const { Pool, Client } = require('pg');
const { Sequelize, DataTypes, Model } = require('sequelize');
const dbConfig = require('../config/db-config.json');

const pgcreateConnection = () => {
  return new Promise((resolve, reject) => {
    // module.exports.init = function(callback) {

    var conStringPri = 'postgres://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.host + dbConfig.port + '/postgres';
    var conStringPost = 'postgres://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.host + dbConfig.port + '/' + dbConfig.dbName;

    // connect to postgres db
    const pool = new Pool({ connectionString: conStringPri })
    // const pool = new Pool({ database: 'postgres' })
    pool.query('CREATE DATABASE ' + dbConfig.dbName, function (err, res) {
      //db should exist now, initialize Sequelize

      var sequelize = new Sequelize(conStringPost);
      sequelize.authenticate()
        .then(async () => {
          class Story extends Model { }
          class RisksAndChallenges extends Model { }
          class EnvironmentalCommitments extends Model { }

          Story.init({
            gif1: { type: DataTypes.TEXT },
            gif2: { type: DataTypes.TEXT },
            gif3: { type: DataTypes.TEXT },
            img1: { type: DataTypes.TEXT },
            img2: { type: DataTypes.TEXT },
            img3: { type: DataTypes.TEXT },
            title1: { type: DataTypes.TEXT },
            title2: { type: DataTypes.TEXT },
            title3: { type: DataTypes.TEXT },
            title4: { type: DataTypes.TEXT },
            title5: { type: DataTypes.TEXT },
            text1: { type: DataTypes.TEXT },
            text2: { type: DataTypes.TEXT },
            text3: { type: DataTypes.TEXT },
            text4: { type: DataTypes.TEXT },
            text5: { type: DataTypes.TEXT }
          }, {
            sequelize,
            modelName: 'Story',
            freezeTableName: true,
            timestamps: false
          });

          RisksAndChallenges.init({
            title1: { type: DataTypes.TEXT },
            title2: { type: DataTypes.TEXT },
            title3: { type: DataTypes.TEXT },
            title4: { type: DataTypes.TEXT },
            title5: { type: DataTypes.TEXT },
            text1: { type: DataTypes.TEXT },
            text2: { type: DataTypes.TEXT },
            text3: { type: DataTypes.TEXT },
            text4: { type: DataTypes.TEXT },
            text5: { type: DataTypes.TEXT }
          }, {
            sequelize,
            modelName: 'RisksAndChallenges',
            freezeTableName: true,
            timestamps: false
          });

          EnvironmentalCommitments.init({
            title1: { type: DataTypes.TEXT },
            title2: { type: DataTypes.TEXT },
            title3: { type: DataTypes.TEXT },
            title4: { type: DataTypes.TEXT },
            title5: { type: DataTypes.TEXT },
            text1: { type: DataTypes.TEXT },
            text2: { type: DataTypes.TEXT },
            text3: { type: DataTypes.TEXT },
            text4: { type: DataTypes.TEXT },
            text5: { type: DataTypes.TEXT }
          }, {
            sequelize,
            modelName: 'EnvironmentalCommitments',
            freezeTableName: true,
            timestamps: false
          });

          await Story.sync()
          await RisksAndChallenges.sync()
          await EnvironmentalCommitments.sync()

          resolve(sequelize)
        })
        .catch((err) => {
          reject(err);
        });
      pool.end();
    })
  })
    .catch((err) => {
      console.log(err);
    });
};

pgcreateConnection();
module.exports.Connection = pgcreateConnection;