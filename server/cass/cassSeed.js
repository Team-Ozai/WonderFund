
const path = require('path');
var cassandra = require('cassandra-driver');
//Replace Username and Password with your cluster settings
var authProvider = new cassandra.auth.PlainTextAuthProvider('root', 'root');
//Replace PublicIP with the IP addresses of your clusters
var contactPoints = ['127.0.0.1'];
var client = new cassandra.Client({ contactPoints: contactPoints, localDataCenter: 'datacenter1', authProvider: authProvider, keyspace: 'campaign' });

var storyPath = path.join(__dirname, 'story.csv');
var rncPath = path.join(__dirname, 'rnc.csv');
var ecPath = path.join(__dirname, 'ec.csv');

const seed = () => {
  client.execute(`COPY "Story"(item_id, gif1, gif2, gif3, img1, img2, img3, title1, title2, title3, title4, title5, text1, text2, text3, text4, text5) FROM '${storyPath}' WITH DELIMITER=',' AND HEADER=TRUE`, function (err, result) {
    if (err) {
      console.log('err', err);
    } else {
      console.log('Story Table Copied');
    }
  });
  client.execute(`COPY "RisksAndChallenges"(item_id, title1, title2, title3, title4, title5, text1, text2, text3, text4, text5) FROM '${rncPath}' WITH DELIMITER=',' AND HEADER=TRUE`, function (err, result) {
    if (err) {
      console.log('err', err);
    } else {
      console.log('Story Table Copied');
    }
  });
  client.execute(`COPY "EnvironmentalCommitments"(item_id, title1, title2, title3, title4, title5, text1, text2, text3, text4, text5) FROM '${ecPath}' WITH DELIMITER=',' AND HEADER=TRUE`, function (err, result) {
    if (err) {
      console.log('err', err);
    } else {
      console.log('Story Table Copied');
    }
  });
};

seed();
