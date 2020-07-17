var assert = require('assert');
//”cassandra-driver” is in the node_modules folder. Redirect if necessary.
var cassandra = require('cassandra-driver');
//Replace Username and Password with your cluster settings
var authProvider = new cassandra.auth.PlainTextAuthProvider('root', 'root');
//Replace PublicIP with the IP addresses of your clusters
var contactPoints = ['127.0.0.1'];
var client = new cassandra.Client({ contactPoints: contactPoints, localDataCenter: 'datacenter1', authProvider: authProvider, keyspace: 'campaign' });

// Queries
var StoryTable = 'CREATE TABLE IF NOT EXISTS "Story" (item_id INT, gif1 TEXT, gif2 TEXT, gif3 TEXT, img1 TEXT, img2 TEXT, img3 TEXT, title1 TEXT, title2 TEXT, title3 TEXT, title4 TEXT, title5 TEXT, text1 TEXT, text2 TEXT, text3 TEXT, text4 TEXT, text5 TEXT ,PRIMARY KEY (item_id))';
var RNCTable = 'CREATE TABLE IF NOT EXISTS "RisksAndChallenges" (item_id INT, title1 TEXT, title2 TEXT, title3 TEXT, title4 TEXT, title5 TEXT, text1 TEXT, text2 TEXT, text3 TEXT, text4 TEXT, text5 TEXT ,PRIMARY KEY (item_id))';
var ECTable = 'CREATE TABLE IF NOT EXISTS "EnvironmentalCommitments" (item_id INT, title1 TEXT, title2 TEXT, title3 TEXT, title4 TEXT, title5 TEXT, text1 TEXT, text2 TEXT, text3 TEXT, text4 TEXT, text5 TEXT ,PRIMARY KEY (item_id))';
var queries = [{ query: StoryTable }, { query: RNCTable }, { query: ECTable }];
var query = 'SELECT name, price_p_item FROM grocery.fruit_stock WHERE name=? ALLOW FILTERING';

//Execute the queries
var createStory = () => {
  return new Promise ((resolve, reject) => {client.execute(StoryTable, function (err, result) {
    if (err) {
      console.log('err', err);
    } else {
      console.log('Story Table Created');
      resolve()
    }
  });
})

};

var createRNC = () => {
  return new Promise ((resolve, reject) => {client.execute(RNCTable, function (err, result) {
    if (err) {
      console.log('err', err);

    } else {
      console.log('RNC Table Created');
      resolve()
    }
  });
  })
};

var createEC = () => {
  return new Promise ((resolve, reject) => {client.execute(ECTable, function (err, result) {
    if (err) {
      console.log('err', err);

    } else {
      console.log('EC Table Created');
      resolve()
    }
  });
  })
};

var createTables = async () => {
  await createStory();
  await createRNC();
  await createEC();
  process.exit();

}
createTables();
