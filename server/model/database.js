const mysql = require('mysql2/promise');
const { Sequelize, DataTypes, Model } = require('sequelize');

const createConnection = ()=>{
  return new Promise ((resolve, reject) =>{
    mysql.createConnection({
      user     : "root",
      password : ""
    })
    .then((connection) => {
      connection.query('CREATE DATABASE IF NOT EXISTS campaign')
    })
    .then(() => {
      const sequelize = new Sequelize('campaign', 'root', null, {
        host: 'localhost',
        dialect: 'mysql',
        logging:false,
        pool: {
          max: 1,
          min: 0,
          acquire: 30000,
          idle: 8000
        }
      });
      sequelize.authenticate()
      .then( async () => {
        class Story extends Model {}
        class RisksAndChallenges extends Model {}
        class EnvironmentalCommitments extends Model {}

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
        });

        await Story.sync()
        await RisksAndChallenges.sync()
        await EnvironmentalCommitments.sync()

        resolve(sequelize)
      })
      .catch( (err) => {
        reject(err);
      });
    })
    .catch( (err) => {
      reject(err);
    });
  })
}

module.exports.Connection = createConnection;
