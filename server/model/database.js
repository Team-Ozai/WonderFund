const mysql = require('mysql2/promise');
const { Sequelize, DataTypes, Model } = require('sequelize');

const createConnection = ()=>{
  return new Promise ((resolve, reject) =>{
    mysql
      .createConnection({
        user     : DATABASE_USER,
        password : DATABASE_PASSWORD
      })
      .then((connection) => {
        connection.query('CREATE DATABASE IF NOT EXISTS campaign')
        .then(() => {

          const sequelize = new Sequelize('campaign', 'root', null, {
            host: 'localhost',
            dialect: 'mysql'
          });

          sequelize
            .authenticate()
            .then( () => {

              class Story extends Model {}
              class RisksAndChallenges extends Model {}
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

              RisksAndChallenges.init({
                title: {
                  type: DataTypes.TEXT
                },
                text: {
                  type: DataTypes.TEXT
                }
              }, {
                sequelize,
                modelName: 'RisksAndChallenges',
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
               RisksAndChallenges.sync()
               EnvironmentalCommitments.sync()

              resolve(sequelize)
          })
        })
    })
  })
}

module.exports.Connection = createConnection;
